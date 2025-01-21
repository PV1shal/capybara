use serde_json::{json, Value};
use tauri::{AppHandle, Manager};
use std::fs;
use std::path::PathBuf;
use std::{
    collections::HashMap,
    time::{Duration, Instant},
};
use tauri::http::{HeaderMap, HeaderName, HeaderValue};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn send_request(
    method_type: &str,
    url: &str,
    params_data: &str,
    headers_data: &str,
    body_data: &str,
) -> Result<Value, String> {
    let client = match reqwest::Client::builder().build() {
        Ok(client) => client,
        Err(error) => {
            println!("Error creating client {}", error);
            return Err(format!("Something went wrong: {}", error));
        }
    };
    let now: Instant = Instant::now();

    let mut final_url = url.to_string();
    let params: HashMap<String, String> = serde_json::from_str(params_data)
        .map_err(|e| format!("Failed to parse params: {}", e))?;
    
    if !params.is_empty() && !url.contains('?') {
        let params_string: String = params.iter()
            .map(|(k, v)| format!("{}={}", 
                urlencoding::encode(k), 
                urlencoding::encode(v)))
            .collect::<Vec<String>>()
            .join("&");
        
        if !params_string.is_empty() {
            final_url = format!("{}?{}", url, params_string);
        }
    }

    let headers: HashMap<String, String> = serde_json::from_str(headers_data)
        .map_err(|e| format!("Failed to parse headers: {}", e))?;
    let mut header_map = HeaderMap::new();

    for (key, value) in headers {
        header_map.insert(
            HeaderName::from_bytes(key.as_bytes())
                .map_err(|e| format!("Invalid header name: {}", e))?,
            HeaderValue::from_bytes(value.as_bytes())
                .map_err(|e| format!("Invalid value type: {}", e))?,
        );
    }

    let req = match method_type.to_lowercase().as_str() {
        "get" => client.get(&final_url),
        "post" => client.post(&final_url),
        "put" => client.put(&final_url),
        "patch" => client.patch(&final_url),
        "delete" => client.delete(&final_url),
        "head" => client.head(&final_url),
        _ => return Err(format!("Unsupported HTTP method: {}", method_type)),
    };

    let req = req.headers(header_map);
    let req = if ["post", "put", "patch"].contains(&method_type.to_lowercase().as_str()) {
        let body_value: Value = serde_json::from_str(body_data)
            .map_err(|e| format!("Failed to parse body data: {}", e))?;
        
        match body_value.get("requestBodyType").and_then(Value::as_str) {
            Some("form-data") => {
                let form_data = body_value.get("requestBodyFormData")
                    .ok_or_else(|| "Missing form data".to_string())?;
                let mut form = reqwest::multipart::Form::new();
                
                if let Some(obj) = form_data.as_object() {
                    for (_, value) in obj {
                        if let (Some(key), Some(val)) = (
                            value.get("key").and_then(Value::as_str),
                            value.get("value").and_then(Value::as_str)
                        ) {
                            form = form.text(key.to_string(), val.to_string());
                        }
                    }
                }
                req.multipart(form)
            },
            Some("raw") => {
                // Get the raw body content directly from requestBodyRaw
                let raw_body = body_value.get("requestBodyRaw")
                    .and_then(Value::as_str)
                    .unwrap_or("{}");

                // Add Content-Type header for JSON
                let req = req.header("Content-Type", "application/json");
                
                // Send the raw body as is
                req.body(raw_body.to_string())
            },
            _ => req.body("{}".to_string()) // Default case
        }
    } else {
        req
    };

    let res = match req.send().await {
        Ok(response) => response,
        Err(e) => {
            println!("Request error: {}", e);
            return Err(format!("Request error: {}", e));
        }
    };

    let elapsed_time: Duration = now.elapsed();

    let result_json = json!({
        "status": res.status().as_u16(),
        "headers": res.headers().iter()
            .map(|(k, v)| (k.to_string(), v.to_str().unwrap_or("").to_string()))
            .collect::<HashMap<String, String>>(),
        "url": res.url().to_string(),
        "version": format!("{:?}", res.version()),
        "body": res.text().await
            .map_err(|e| format!("Failed to read response body: {}", e))?,
        "responseTime": format!("{:?}", elapsed_time)
    });

    Ok(result_json)
}

#[tauri::command]
async fn save_collection(
        app_handler: AppHandle, collection_id: &str, 
        collection_name: &str, collection_data: &str) -> Result<(), String> {
    // Get the app data directory
    let app_data_dir = match app_handler.path().app_data_dir() {
        Ok(dir) => dir,
        Err(e) => {
            let err = format!("Failed to get app data directory: {}", e);
            println!("{}", err);
            return Err(err);
        }
    };

    if !app_data_dir.exists() {
        if let Err(e) = fs::create_dir_all(&app_data_dir) {
            let error = format!("Error creating app directory: {} {:?}", e, app_data_dir);
            println!("{}", error);
            return Err(error);
        }
    }

    let collections_dir: PathBuf = app_data_dir.join("collections");
    if !collections_dir.exists() {
        if let Err(e) = fs::create_dir_all(&collections_dir) {
            let error = format!("Error creating collections directory: {} {:?}", e, collections_dir);
            println!("{}", error);
            return Err(error);
        }
    }

    let parsed_data: Value = match serde_json::from_str(collection_data) {
        Ok(data) => data,
        Err(e) => {
            let error = format!("Invalid JSON data: {}", e);
            println!("{}", error);
            return Err(error);
        }
    };

    let file_path = collections_dir.join(format!("{}_{}.json", collection_id, collection_name));
    if let Err(e) = fs::write(&file_path, serde_json::to_string_pretty(&parsed_data).unwrap()) {
        let error = format!("Error writing to file: {} {:?}", e, file_path);
        println!("{}", error);
        return Err(error);
    }

    println!("Successfully saved collection at {:?}", file_path);
    Ok(())
}

#[tauri::command]
async fn get_collections ( app_handler: AppHandle ) -> Result<Value, String> {
    let app_data_dir = match app_handler.path().app_data_dir() {
        Ok(dir) => dir,
        Err(e) => {
            let err = format!("Failed to get app data directory: {}", e);
            println!("{}", err);
            return Err(err);
        }
    };
    
    if !app_data_dir.exists() {
        if let Err(e) = fs::create_dir_all(&app_data_dir) {
            let error = format!("Error creating app directory: {} {:?}", e, app_data_dir);
            println!("{}", error);
            return Err(error);
        }
    }
    
    let collections_dir: PathBuf = app_data_dir.join("collections");
    if !collections_dir.exists() {
        if let Err(e) = fs::create_dir_all(&collections_dir) {
            let error = format!("Error creating collections directory: {} {:?}", e, collections_dir);
            println!("{}", error);
            return Err(error);
        }
    }

    let files = fs::read_dir(&collections_dir).unwrap();
    let mut collections = serde_json::Value::Array(Vec::new());
    for file in files {
        match file {
            Ok(entry) => {
                let file_content = fs::read(entry.path()).unwrap();
                match serde_json::from_slice::<serde_json::Value>(&file_content) {
                    Ok(json) => {
                        collections.as_array_mut().unwrap().push(json);
                    }
                    Err(e) => {
                        eprintln!("Error reading file: {}", e);
                    }
                }
            }
            Err(e) => {
                eprintln!("Error reading file: {}", e);
            }
        }
    }

    Ok(collections)
}

#[tauri::command]
fn delete_collection(app_handler: AppHandle, collection_id: &str, collection_name: &str) -> Result<(), String> {
    let app_data_dir = match app_handler.path().app_data_dir() {
        Ok(dir) => dir,
        Err(e) => {
            let err = format!("Failed to get app data directory: {}", e);
            println!("{}", err);
            return Err(err);
        }
    };
    
    if !app_data_dir.exists() {
        if let Err(e) = fs::create_dir_all(&app_data_dir) {
            let error = format!("Error creating app directory: {} {:?}", e, app_data_dir);
            println!("{}", error);
            return Err(error);
        }
    }
    
    let collections_dir: PathBuf = app_data_dir.join("collections");
    if !collections_dir.exists() {
        if let Err(e) = fs::create_dir_all(&collections_dir) {
            let error = format!("Error creating collections directory: {} {:?}", e, collections_dir);
            println!("{}", error);
            return Err(error);
        }
    }

    let file_path = collections_dir.join(format!("{}_{}.json", collection_id, collection_name));
    let _ = fs::remove_file(&file_path);
    
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            send_request,
            save_collection,
            get_collections,
            delete_collection
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
