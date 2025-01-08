use std::{collections::HashMap, time::{Duration, Instant}};
use serde_json::{json, Value};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn send_request(method_type: String, url: String, params_data: String, headers_data: String, body_data: String) -> Result<Value, String> {
    let client = match reqwest::Client::builder().build() {
        Ok(client) => client,
        Err(error) => {
            println!("Error creating client {}", error);
            return Err(format!("Something went wrong: {}", error));
        }
    };

    let now: Instant = Instant::now();
    let res = match client.get(&url).send().await {
        Ok(response) => response,
        Err(e) => {
            println!("Request error: {}", e);
            return Err(format!("Request error: {}", e))
        }
    };

    let elapsed_time: Duration = now.elapsed();

    let status = res.status().as_u16();
    let url = res.url().to_string();
    let version = format!("{:?}", res.version());
    let headers: HashMap<String, String> = res.headers().iter().map(|(k, v)| (k.to_string(), v.to_str().unwrap_or("").to_string())).collect();
    let body = res.text().await.map_err(|e| format!("Failed to reade response body: {}", e))?;
    let response_time: String = format!("{:?}", elapsed_time);

    let result_json: Value = json!({
        "status": status,
        "headers": headers,
        "body": body,
        "url": url,
        "version": version,
        "responseTime": response_time
    });

    Ok(result_json)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, send_request])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
