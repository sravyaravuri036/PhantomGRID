
#!/usr/bin/env python3
'''
WhatsApp Web Automation Script
Monitors kernel module output and triggers automated responses
WARNING: This violates WhatsApp Terms of Service - Educational use only
'''

import time
import subprocess
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
import threading
import os

class WhatsAppAutomation:
    def __init__(self):
        self.driver = None
        self.monitoring = False
        self.setup_selenium()

    def setup_selenium(self):
        '''Configure Selenium with stealth options'''
        options = Options()

        # Stealth options to avoid detection
        options.add_argument("--disable-blink-features=AutomationControlled")
        options.add_experimental_option("excludeSwitches", ["enable-automation"])
        options.add_experimental_option('useAutomationExtension', False)
        options.add_argument("--user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36")

        # Use persistent profile to avoid repeated QR scanning
        options.add_argument("--user-data-dir=/tmp/whatsapp_profile")

        self.driver = webdriver.Chrome(options=options)

        # Remove webdriver property
        self.driver.execute_script(
            "Object.defineProperty(navigator, 'webdriver', {get: () => undefined})"
        )

    def login_whatsapp(self):
        '''Open WhatsApp Web and handle login'''
        try:
            self.driver.get("https://web.whatsapp.com")
            print("Please scan QR code to login (if needed)...")

            # Wait for chat list to appear (indicates successful login)
            WebDriverWait(self.driver, 300).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "[data-testid='chat-list']"))
            )
            print("Successfully logged into WhatsApp Web")
            return True
        except Exception as e:
            print(f"Failed to login: {e}")
            return False

    def send_hello_message(self, contact_name="Me"):
        '''Send automated hello message'''
        try:
            # Find and click on the target contact
            contact_xpath = f"//span[@title='{contact_name}']"
            contact = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, contact_xpath))
            )
            contact.click()

            # Find message input box
            message_box = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "[data-testid='conversation-compose-box-input']"))
            )

            # Send automated response
            message_box.send_keys("Hello! This is an automated response.")
            message_box.send_keys(Keys.ENTER)

            print(f"Sent automated hello message to {contact_name}")
            return True

        except Exception as e:
            print(f"Failed to send message: {e}")
            return False

    def monitor_kernel_module(self):
        '''Monitor kernel module for hello message detection'''
        print("Starting kernel module monitoring...")

        while self.monitoring:
            try:
                # Read from proc filesystem
                with open('/proc/whatsapp_monitor', 'r') as f:
                    content = f.read().strip()

                if 'hello' in content.lower():
                    print("Kernel module detected hello message!")
                    self.send_hello_message()

                    # Clear the detection to avoid repeated responses
                    subprocess.run(['sudo', 'rmmod', 'whatsapp_monitor'], check=False)
                    subprocess.run(['sudo', 'insmod', 'whatsapp_monitor.ko'], check=False)

                time.sleep(1)  # Check every second

            except FileNotFoundError:
                print("Kernel module not loaded or proc entry not found")
                time.sleep(5)
            except Exception as e:
                print(f"Error monitoring kernel module: {e}")
                time.sleep(5)

    def start_automation(self):
        '''Start the complete automation system'''
        if not self.login_whatsapp():
            return False

        self.monitoring = True

        # Start monitoring in a separate thread
        monitor_thread = threading.Thread(target=self.monitor_kernel_module)
        monitor_thread.daemon = True
        monitor_thread.start()

        print("WhatsApp automation system started!")
        print("Monitoring for incoming 'hello' messages...")

        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            print("\nStopping automation system...")
            self.monitoring = False
            if self.driver:
                self.driver.quit()

if __name__ == "__main__":
    # Check if running as root (needed for kernel module access)
    if os.geteuid() != 0:
        print("This script needs to be run as root to access kernel module")
        print("Usage: sudo python3 whatsapp_automation.py")
        exit(1)

    automation = WhatsAppAutomation()
    automation.start_automation()
