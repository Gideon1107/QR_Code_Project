/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import qr from "qr-image";
import fs from "fs";

const urlQuestion = {
    type: 'input',
    name: 'url',
    message: 'Please enter a URL: '
};

// Prompt the user for the URL
inquirer
    .prompt(urlQuestion)
    .then(answer => {
        const enteredURL = answer.url;

        //convert the url to qr image
        var qr_png = qr.image(enteredURL);

        //write the qr img to file
        qr_png.pipe(fs.createWriteStream('url_qr.png'));
        
        //Write to File
        fs.writeFile('entered_url.txt', answer.url, (error) => {
            if (error) {
                console.error('Error writing URL to file:', error);
            } else {
                console.log('Entered URL saved as entered_url.txt');
            }
        });
    })
    .catch(error => {
        console.error('Error occurred:', error);
    });

