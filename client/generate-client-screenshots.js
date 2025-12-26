import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'http://localhost:5176'; 
const OUTPUT_DIR = path.join(__dirname, 'screenshots');

const PAGES = [
    // Client/Admin Pages
    { name: 'CertificateView', path: '/certificates/cert_123' },
];

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 100;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight - window.innerHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

async function generateScreenshots() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }

    console.log('Starting Screenshot generation...');
    console.log(`Connecting to ${BASE_URL}.`);

    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
    });

    try {
        const page = await browser.newPage();
         // Set a real User Agent
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        
        // Set a wide viewport
        await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

        // --- LOGIN FLOW ---
        console.log('Performing Login...');
        await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle0' });
        
        await page.type('input[type="email"]', 'admin@example.com');
        await page.type('input[type="password"]', '123456');
        await page.click('button[type="submit"]');
        
        await page.waitForNavigation({ waitUntil: 'networkidle0' });
        console.log('Login Successful!');
        // ------------------

        // Defined pages to capture directly
        const PAGES = [
            { name: 'Courses', path: '/dashboard/courses' },
            // CourseView will be captured dynamically
        ];

        for (const { name, path } of PAGES) {
            console.log(`Capturing: ${name} (${path})...`);
            
            await page.goto(`${BASE_URL}${path}`, {
                waitUntil: 'networkidle0',
                timeout: 60000
            });

            // Perform auto-scroll to trigger lazy loading
            console.log('Scrolling to trigger lazy loads...');
            await autoScroll(page);
            await page.evaluate(() => window.scrollTo(0, 0));

            // Inject CSS
            await page.addStyleTag({
                content: `
                    * {
                        transition: none !important;
                        animation: none !important;
                        opacity: 1 !important;
                        visibility: visible !important;
                        transform: none !important;
                    } 
                `
            });

            console.log('Final wait before capture...');
            await new Promise(resolve => setTimeout(resolve, 3000));

            await page.screenshot({
                path: `${OUTPUT_DIR}/${name}.png`,
                fullPage: true,
                type: 'png'
            });
            console.log(`Saved ${name}.png`);
        }

        // --- DYNAMIC CAPTURE FOR COURSE VIEW ---
        console.log('Capturing dynamic CourseView...');
        // Go back to course list
        await page.goto(`${BASE_URL}/dashboard/courses`, { waitUntil: 'networkidle0' });
        
        // Find first "View Course" link and click it
        // The link text is "View Course"
        const courseLink = await page.$('a[href^="/dashboard/course/"]');
        
        if (courseLink) {
            console.log('Found a course link, clicking...');
            await Promise.all([
                page.waitForNavigation({ waitUntil: 'networkidle0' }),
                courseLink.click()
            ]);
            
            console.log('Navigated to Course View. Capturing...');
            await autoScroll(page);
            await page.evaluate(() => window.scrollTo(0, 0));
            
            // Set a very tall viewport to ensure all modules are rendered and captured
            await page.setViewport({ width: 1440, height: 4000, deviceScaleFactor: 2 });
            
            // Inject CSS again just in case
             await page.addStyleTag({
                content: `
                    * {
                        transition: none !important;
                        animation: none !important;
                        opacity: 1 !important;
                        visibility: visible !important;
                        transform: none !important;
                    } 
                `
            });

            await new Promise(resolve => setTimeout(resolve, 3000));

            await page.screenshot({
                path: `${OUTPUT_DIR}/CourseView.png`,
                fullPage: true,
                type: 'png'
            });
            console.log('Saved CourseView.png');
        } else {
            console.log('No course links found to click.');
        }

        // --- DYNAMIC CAPTURE FOR QUIZ MODULE ---
        console.log('Capturing dynamic Quiz Module...');
        // We are already on Course View from previous step.
        // Find the "Final Exam Quiz" link or "Start Module" button corresponding to it
        // The buttons are "Start Module". The text "Final Exam Quiz" is in a sibling element or parent.
        // We can search for the text "Final Exam Quiz" and then find the button in its container.
        
        // This is a bit tricky with puppeteer selectors. Let's try to find the button index.
        // It's the last module.
        const startModuleButtons = await page.$$('a[href*="/module/"]');
        if (startModuleButtons.length > 0) {
           const lastButton = startModuleButtons[startModuleButtons.length - 1]; // Assuming Quiz is last
           console.log('Found last module button (Quiz), clicking...');
           
           await Promise.all([
                page.waitForNavigation({ waitUntil: 'networkidle0' }),
                lastButton.click()
            ]);
            
            console.log('Navigated to Quiz Module. Capturing...');
             await autoScroll(page);
             await page.evaluate(() => window.scrollTo(0, 0));
             await page.addStyleTag({
                content: `
                    * {
                        transition: none !important;
                        animation: none !important;
                        opacity: 1 !important;
                        visibility: visible !important;
                        transform: none !important;
                    } 
                `
            });
            await new Promise(resolve => setTimeout(resolve, 3000));

            await page.screenshot({
                path: `${OUTPUT_DIR}/QuizModule.png`,
                fullPage: true,
                type: 'png'
            });
            console.log('Saved QuizModule.png');
        } else {
            console.log('No module buttons found.');
        }

        console.log('All screenshots saved in the /screenshots folder!');

    } catch (error) {
        console.error('Error generating screenshots:', error);
    } finally {
        await browser.close();
    }
}

generateScreenshots();
