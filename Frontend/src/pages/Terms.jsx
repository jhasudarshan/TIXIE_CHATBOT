import React from 'react';
import '../styles/Policy.css';

const Terms = () => {
    return (
        <div>
            <header>
                <h1>Tixie Chatbot - Terms and Conditions</h1>
            </header>
            <main>
                <section>
                    <p>Welcome to Tixie, your virtual assistant for booking tickets. By using our chatbot, you agree to the following terms and conditions.</p>
                </section>
                <section>
                    <h3>1. User Responsibilities</h3>
                    <p>Users must provide accurate information when booking tickets. Tixie is not responsible for any errors due to incorrect user input.</p>
                </section>
                <section>
                    <h3>2. Privacy Policy</h3>
                    <p>Your privacy is important to us. We collect and use your data in accordance with our privacy policy.</p>
                </section>
                <section>
                    <h3>3. Limitation of Liability</h3>
                    <p>Tixie is not liable for any damages arising from the use of our chatbot.</p>
                </section>
                <section>
                    <h3>4. Changes to Terms</h3>
                    <p>We reserve the right to modify these terms at any time. Users will be notified of any changes.</p>
                </section>
                <section>
                    <h3>5. Contact Us</h3>
                    <p>If you have any questions regarding these terms, please contact us at support@tixie.com.</p>
                </section>
            </main>
            <footer>
                <p>&copy; 2024 Tixie. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Terms;
