const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

// Images to convert
const imagesToConvert = [
    'app-icon.png',
    'blog_tripcase_alternative_1763732127838.png'
];

// Also optimize the app icon.png
const appIconPath = path.join(__dirname, 'app', 'icon.png');

async function convertImages() {
    console.log('Starting image conversion to WebP...\n');

    // Convert public directory PNGs
    for (const imageName of imagesToConvert) {
        const inputPath = path.join(publicDir, imageName);
        const outputPath = path.join(publicDir, imageName.replace('.png', '.webp'));

        if (fs.existsSync(inputPath)) {
            try {
                const stats = fs.statSync(inputPath);
                const originalSizeKB = (stats.size / 1024).toFixed(2);

                await sharp(inputPath)
                    .webp({ quality: 85, effort: 6 })
                    .toFile(outputPath);

                const newStats = fs.statSync(outputPath);
                const newSizeKB = (newStats.size / 1024).toFixed(2);
                const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);

                console.log(`✓ Converted ${imageName}`);
                console.log(`  Original: ${originalSizeKB} KB → WebP: ${newSizeKB} KB (${savings}% smaller)\n`);
            } catch (error) {
                console.error(`✗ Error converting ${imageName}:`, error.message);
            }
        } else {
            console.log(`⚠ File not found: ${imageName}`);
        }
    }

    // Optimize app icon.png (reduce size without changing format for PWA compatibility)
    if (fs.existsSync(appIconPath)) {
        try {
            const stats = fs.statSync(appIconPath);
            const originalSizeKB = (stats.size / 1024).toFixed(2);
            const tempPath = appIconPath + '.tmp';

            await sharp(appIconPath)
                .png({ quality: 85, compressionLevel: 9, effort: 10 })
                .toFile(tempPath);

            // Replace original with optimized version
            fs.renameSync(tempPath, appIconPath);

            const newStats = fs.statSync(appIconPath);
            const newSizeKB = (newStats.size / 1024).toFixed(2);
            const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);

            console.log(`✓ Optimized app/icon.png`);
            console.log(`  ${originalSizeKB} KB → ${newSizeKB} KB (${savings}% smaller)\n`);
        } catch (error) {
            console.error(`✗ Error optimizing app/icon.png:`, error.message);
        }
    }

    console.log('Image conversion complete!');
}

convertImages().catch(console.error);
