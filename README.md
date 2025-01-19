# Capybara - A Lightweight API Testing Tool

<div align="center">
  <img src="https://github.com/user-attachments/assets/b4311f7c-dffa-411a-abe6-326e8c418f65" alt="Capybara Meme" width="300" height="350">
</div>

Capybara is an efficient, open-source API testing tool built with Rust and React using the Tauri framework. It provides a modern, resource-efficient alternative to traditional API testing tools.

## Features

- **Resource Efficient**: Uses only ~100MB RAM (compared to Postman's 600MB) and ~10MB storage
- **Full HTTP Support**: Handles all HTTP methods (GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS)
- **Modern Interface**: Clean, intuitive UI with dark mode
- **Tab-based Testing**: Test multiple APIs simultaneously
- **Request Organization**: Manage requests in collections
- **Advanced Request Configuration**:
  - Query Parameters
  - Headers
  - Request Body (Form Data and Raw)
- **Local Storage**: Efficiently saves collections and requests
- **Cross-platform**: Works on Windows, macOS, and Linux


## Screenshots

![image](https://github.com/user-attachments/assets/7cb1efd4-8bf8-49da-8edf-0a25234a8251)
![image](https://github.com/user-attachments/assets/45af6930-f0b4-4baf-961a-995ad5bf94b7)

## Comparison

**Local memory storage (Postman Vs Capybara):**

![image](https://github.com/user-attachments/assets/dc02a239-9c46-433e-b58b-c963768bdb4c)
![image](https://github.com/user-attachments/assets/7cae30a4-0e85-489e-89c4-535ae97a2e7e)

**Ram usage (Postman Vs Capybara):**

![image](https://github.com/user-attachments/assets/f1ac4041-8c45-4f8e-a424-f1a373d508a0)
![image](https://github.com/user-attachments/assets/b4615dfa-c1e7-44f3-9848-14ae55905198)

## Why Capybara?

- **Performance**: Significantly lower memory footprint than other API testing tools
- **Speed**: Built with Rust for optimal performance
- **Open Source**: Free to use and modify
- **Modern Stack**: Uses latest technologies (Rust, React, Tauri)
- **Lightweight**: Only 10MB installation size
- **No Electron**: Built with Tauri for better resource management

## Installation

1. Download the latest release for your platform from the releases page
2. Install the application:
   - Windows: Run the `.msi` installer
   - macOS: Move `.app` to Applications folder
   - Linux: Use the `.AppImage` or `.deb` package

For development:

```bash
# Clone the repository
git clone https://github.com/PV1shal/capybara.git

# Install dependencies
cd capybara
npm install

# Run in development mode
npm run tauri dev

# Build for production
npm run tauri build
```

## Requirements

- Windows 10/11, macOS 10.15+, or Linux
- 100MB RAM
- 10MB storage space

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use and modify as needed.

## Roadmap

- [ ] AI-powered test generation
- [ ] Environment variables
- [ ] Request chaining
- [ ] WebSocket support
- [ ] OAuth 2.0 authentication
