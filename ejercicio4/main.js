
const fetch = require('node-fetch');
const fs = require('fs');

async function postData(url,data){
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key' : 'ea670047974b650bbcba5dd759baf1ed',
            'Accept' : 'application/json',
            'Content-Length': data.length,          
        },
        body: JSON.stringify(data),
    });
    const jsonData = await response.json();
    return jsonData;
}

async function main(){
    const url = "https://stage.api.enviame.io/api/s2/v2/companies/401/deliveries";

    const data = {
        "shipping_order": {
            "n_packages": "1",
            "content_description": "ORDEN 255826267",
            "imported_id": "255826267",
            "order_price": "24509.0",
            "weight": "0.98",
            "volume": "1.0",
            "type": "delivery"
        },
        "shipping_origin": {
            "warehouse_code": "401"
        },
        "shipping_destination": {
            "customer": {
                "name": "Bernardita Tapia Riquelme",
                "email": "b.tapia@outlook.com",
                "phone": "977623070"
            },
            "delivery_address": {
                "home_address": {
                    "place": "Puente Alto",
                    "full_address": "SAN HUGO 01324, Puente Alto, Puente Alto"
                }
            }
        },
        "carrier": {
            "carrier_code": "",
            "tracking_number": ""
        }
    }

    const filename = "respuesta_api.json";

    const val = await postData(url,data);

    fs.writeFile(filename, JSON.stringify(val), function (err) {
        if (err) return console.log(err);
        console.log('Datos de la API escritos en: ' + filename);
    });
}

main();


