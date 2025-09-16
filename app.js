document.addEventListener('DOMContentLoaded', () => {

    // Define packages and prices, similar to our Python dictionary
    const packages = {
        "Wenge": {
            duration: "1 hour",
            photos: "5 - 14 photos",
            outfit_family: "1 outfit / family",
            location: "1 location",
            price: 175
        },
        "Padauk": {
            duration: "2 hours",
            photos: "15 - 24 photos",
            outfit_family: "2 outfits / family",
            location: "1 location",
            price: 250
        },
        "Ebony": {
            duration: "3 hours",
            photos: "25+ photos",
            outfit_family: "3 outfits / family",
            location: "2+ locations",
            price: 350
        }
    };

    // Define pricing for custom quotes
    const customPricing = {
        basePrice: 100,
        costPerHour: 50,
        costPerPhoto: 5,
        costPerOutfit: 25
    };

    // Get HTML elements
    const questionnaireForm = document.getElementById('questionnaire-form');
    const quoteSection = document.getElementById('quote-section');
    const recommendationDiv = document.getElementById('recommendation');
    const packageOptionsDiv = document.getElementById('package-options');
    const quoteResultDiv = document.getElementById('quote-result');
    const calculateCustomBtn = document.getElementById('calculateCustom');
    const customDurationInput = document.getElementById('customDuration');
    const customPhotosInput = document.getElementById('customPhotos');
    const customOutfitsInput = document.getElementById('customOutfits');

    // Function to handle form submission
    questionnaireForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevents the form from submitting and reloading the page

        // Get questionnaire data
        const sessionType = document.getElementById('sessionType').value.toLowerCase();
        
        // Hide questionnaire and show quote section
        document.getElementById('questionnaire-section').style.display = 'none';
        quoteSection.style.display = 'block';

        // Make a recommendation
        recommendPackage(sessionType);
        
        // Display all packages
        displayPackages();
    });

    // Function to recommend a package based on session type
    function recommendPackage(sessionType) {
        let recommendationText = '';
        if (sessionType.includes('family') || sessionType.includes('event')) {
            recommendationText = "Based on your interest in a family or event session, we recommend the 'Ebony' package. It provides more time and photos to capture all the special moments.";
        } else if (sessionType.includes('portrait')) {
            recommendationText = "For a portrait session, the 'Wenge' or 'Padauk' package might be a great fit for you.";
        } else {
            recommendationText = "Feel free to browse our packages below!";
        }
        recommendationDiv.innerHTML = `<p>${recommendationText}</p>`;
    }

    // Function to display packages
    function displayPackages() {
        packageOptionsDiv.innerHTML = ''; // Clear previous content
        for (const name in packages) {
            const package = packages[name];
            const card = document.createElement('div');
            card.className = 'package-card';
            card.innerHTML = `
                <h3>${name} Package</h3>
                <ul>
                    <li><strong>Duration:</strong> ${package.duration}</li>
                    <li><strong>Photos:</strong> ${package.photos}</li>
                    <li><strong>Outfits/Families:</strong> ${package.outfit_family}</li>
                    <li><strong>Price:</strong> ${package.price} €</li>
                </ul>
            `;
            card.addEventListener('click', () => {
                displayQuote(name, package);
            });
            packageOptionsDiv.appendChild(card);
        }
    }

    // Function to display the final quote for a standard package
    function displayQuote(name, package) {
        quoteResultDiv.innerHTML = `
            <h3>Your Selected Package</h3>
            <p><strong>Package:</strong> ${name}</p>
            <p><strong>Price:</strong> ${package.price} €</p>
            <p>Thank you for choosing my services!</p>
        `;
        quoteResultDiv.scrollIntoView({ behavior: 'smooth' });
    }

    // Event listener for the custom quote button
    calculateCustomBtn.addEventListener('click', () => {
        const duration = parseInt(customDurationInput.value);
        const photos = parseInt(customPhotosInput.value);
        const outfits = parseInt(customOutfitsInput.value);

        if (isNaN(duration) || isNaN(photos) || isNaN(outfits)) {
            alert("Please enter valid numbers for all fields.");
            return;
        }

        const totalPrice = customPricing.basePrice + 
                           (duration * customPricing.costPerHour) + 
                           (photos * customPricing.costPerPhoto) + 
                           (outfits * customPricing.costPerOutfit);

        quoteResultDiv.innerHTML = `
            <h3>Your Custom Quote</h3>
            <p><strong>Duration:</strong> ${duration} hours</p>
            <p><strong>Photos:</strong> ${photos} photos</p>
            <p><strong>Outfits:</strong> ${outfits} outfits</p>
            <p><strong>Estimated Price:</strong> ${totalPrice} €</p>
            <p>This is an estimate. The final price may be adjusted during our consultation.</p>
        `;
        quoteResultDiv.scrollIntoView({ behavior: 'smooth' });
    });
});