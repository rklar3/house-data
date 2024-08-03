
// import fetch from 'node-fetch';
const fs = require('fs');

const url = "https://housesigma.com/bkv2/api/search/mapsearchv3/listing";
const headers = {
    "Authorization": "Bearer 20240802srl5tvis70lnk2a500shi0gfiv",
    "Content-Type": "application/json"
};
const payload = {
    // basement: [],
    // bathroom_min: 0,
    // bedroom_range: [0],
    // de_list_days: 90,
    // description: "",
    // front_feet: [0, 100],
    // garage_min: 0,
    // // house_type: ["C."],
    // house_type: ["all"],
    // lang: "en_US",
    // lat1: 49.211519836150245,
    // lat2: 49.11316029760789,
    // list_type: [3],
    // listing_days: 90,
    // listing_type: ["all"],
    // lon1: -122.70246675259749,
    // lon2: -122.90262391812468,
    // lot_size: [0, 10000000],
    // max_maintenance_fee: 0,
    // open_house_date: 0,
    // price: [0, 6000000],
    // province: "BC",
    // rent_list_type: [2],
    // signature: "d4e0ca76b96d076ad555e19ebedb01f3",
    // sold_days: 90,
    // square_footage: [0, 4000],
    // ts: "1722617792",
    // zoom: 13

    
        "lang": "en_US",
        "province": "BC",
        "list_type": [
          3
        ],
        "rent_list_type": [
          2
        ],
        "listing_days": 0,
        "sold_days": 180,
        "de_list_days": 90,
        "basement": [],
        "open_house_date": 0,
        "description": "",
        "listing_type": [
          "all"
        ],
        "max_maintenance_fee": 0,
        "house_type": [
          "D.",
          "V."
        ],
        "price": [
          2000000,
          6000000
        ],
        "front_feet": [
          0,
          100
        ],
        "square_footage": [
          0,
          4000
        ],
        "lot_size": [
          21780,
          10000000
        ],
        "bedroom_range": [
          0
        ],
        "bathroom_min": 0,
        "garage_min": 0,
        "lat1": 49.206877937440225,
        "lon1": -122.49267731570195,
        "lat2": 49.06038447063429,
        "lon2": -122.83866087902939,
        "zoom": 11.8,
        "signature": "675f373b4dc8c403d39f046d1b0356f2",
        "ts": "1722636705"
      
    
};




async function main() {

    // function calculatePayoffTime(inputs) {
    //     const { purchasePrice, annualTaxes, monthlyRent, monthlyExpenses, annualInterestRate } = inputs;
    
    //     if (purchasePrice <= 0 || annualTaxes < 0 || monthlyRent <= 0 || monthlyExpenses < 0 || annualInterestRate <= 0) {
    //         throw new Error("Invalid input values. All values must be positive.");
    //     }
    
    //     // Initial calculations
    //     const downPayment = 0.20 * purchasePrice;
    //     const loanAmount = purchasePrice - downPayment;
    //     const monthlyInterestRate = annualInterestRate / 12 / 100;
    
    //     // Monthly mortgage payment using the formula for an amortizing loan
    //     // P = L[c(1 + c)^n] / [(1 + c)^n – 1]
    //     const n = 30 * 12; // Assuming a 30-year mortgage
    //     const monthlyMortgagePayment = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, n)) / (Math.pow(1 + monthlyInterestRate, n) - 1);
    
    //     // Monthly net income from the property
    //     const monthlyNetIncome = monthlyRent - (monthlyExpenses + annualTaxes / 12 + monthlyMortgagePayment);
    
    //     if (purchasePrice >0 && monthlyNetIncome <= 0) {
    //         // throw new Error("Monthly net income is not enough to cover the expenses and mortgage payment.");
    //         return 'Monthly net income is not enough to cover the expenses and mortgage payment'
    //     }
    
    //     // Cumulative cash flow and month counter
    //     let cumulativeCashFlow = -downPayment;
    //     let months = 0;
    
    //     // Calculate the number of months to pay off the property
    //     while (cumulativeCashFlow < 0) {
    //         cumulativeCashFlow += monthlyNetIncome;
    //         months++;
    //     }
    
    //     return months;
    // }
    

    
    // function parseTax(taxString) {
    //     // Regular expression to match the tax value before the " / " separator
    //     const match = taxString.match(/^\s*([\d,]+)\s*\//);
    //     if (match) {
    //         // Remove commas from the matched tax value and convert to number
    //         return parseInt(match[1].replace(/,/g, ''), 10);
    //     }
    //     // throw new Error("Invalid tax string format");
    //     return 2000;
    // }


    let list = [];
    let listingData = [];
    let counter = 0;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const listings = data.data.list;


        for(const listing of listings){
            // console.log(listing)
            // console.log('----')

            for(const id of listing.ids){
                // console.log(id)

                list.push(id)

            }
        }

        // console.log(list);

        const url2 = "https://housesigma.com/bkv2/api/listing/info/detail_v2";


        for(const listing_id of list){
            
          
        

            // console.log('---')

            const payload2 = {
                id_listing: listing_id
            };

            const listing_response = await fetch(url2, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload2)
            });

            if (!listing_response.ok) {
                throw new Error(`HTTP error! status: ${listing_response.status}`);
            }

            const data = await listing_response.json();
            // console.log(data);
         
            // console.log(data.data.house.list_status);

             // Remove commas from the string
             const sanitizedEstimateRent = data.data.analytics.estimate_rent.replace(/,/g, '');
             const sanitizedPrice = data.data.house.price.replace(/,/g, '');

            // const taxValue = parseTax(data.data.key_facts.tax);

            // const inputs = {
            //     purchasePrice: sanitizedPrice,
            //     annualTaxes: taxValue,
            //     monthlyRent: sanitizedEstimateRent,
            //     monthlyExpenses: 300,
            //     annualInterestRate: 4.5,
            // };
            
            const cap_rate = (((Number(sanitizedEstimateRent) * 12 ) / Number(sanitizedPrice) * 100)); 

            console.log('ml_num - ',data.data.house.ml_num, 'cap rate - ' +  Number(cap_rate.toFixed(2)))
            

            // if(cap_rate > 6){
          


            // const payoffTime = calculatePayoffTime(inputs);

            // console.log('payoffTime -', payoffTime);

            // console.log('tax -', taxValue);

           
            console.log('address -', data.data.house.address);
            
           console.log('sold price - ' ,sanitizedPrice);
           console.log('downpayment 20% - ' ,sanitizedPrice * .2);
           console.log('estimated rent price -' , sanitizedEstimateRent);
           console.log('estimated rent days -', data.data.analytics.estimate_rent_days);

            // console.log('maintenance -', data.data.key_facts.maintenance);

            // if( data.data.listing_history &&  data.data.listing_history.length>0){
                // console.log('listing_history -', data.data.listing_history[0].status);
            // console.log('parking -', data.data.key_facts.parking);
            // }

            // if(data.data.assessment && data.data.assessment.history &&  data.data.assessment.history.length>0){
            //     console.log('assesment 2023 -', data.data.assessment.history[0].total ?? "" );

            //     if( data.data.assessment.history.length>1){
            //         console.log('assesment 2022 -', data.data.assessment.history[1].total??"" );
            //     }
            // }

            listingData.push(data.data);
            fs.writeFileSync('listings.json', JSON.stringify(listingData, null, 2));
            console.log('Data saved to listings.json');

            counter++;
            if(counter == 100){
                break;
            }

            console.log('-----');
            console.log('     ');

            // }
            
        }

    

    } catch (error) {
        console.error('Error:', error);
    }

 
}

// Call the async function
main();


// type CalculatorInputs = {
//     purchasePrice: number;
//     annualTaxes: number;
//     monthlyRent: number;
//     monthlyExpenses: number;
//     annualInterestRate: number;
// };





// const url = "https://housesigma.com/bkv2/api/listing/info/detail_v2";
// const headers = {
//     "Authorization": "Bearer 20240802srl5tvis70lnk2a500shi0gfiv",
//     "Content-Type": "application/json"
// };
// const payload = {
//     id_listing: "nbq6y1KgoaE3o9DA"
// };

// const response = await fetch(url, {
//     method: 'POST',
//     headers: headers,
//     body: JSON.stringify(payload)
// });

// if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
// }

// const data = await response.json();
// console.log(data.data.house.id_listing);
// console.log(data.data.house.address);
// console.log(data.data.house.list_status);
// console.log(data.data.house.price);
// console.log('-----');