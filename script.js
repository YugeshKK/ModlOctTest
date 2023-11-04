document.addEventListener("DOMContentLoaded", () => {

    function getIpAddress() {
        try {
            fetch("https://ipapi.co/json/")
            .then(response => response.json())
            .then(data => { 
                var ipAddress = data.ip;
                document.getElementById("ipAddress").textContent = ipAddress;

                // Handle the "Fetch Location Details" button click
                document.getElementById("fetchLocation").addEventListener("click", () => {
                    document.getElementById("aa").innerText = ipAddress;
                    const lat = data.latitude;
                    const lon = data.longitude;
                    const city= data.city;
                    const org= data.org;
                    const reg= data.region;
                    const timezone = data.timezone;
                    const currentDate = new Date().toLocaleDateString();
                    const pincode = data.postal;

                    document.getElementById("lat").innerText = lat;
                    document.getElementById("city").innerText = city;
                    document.getElementById("org").innerText = org;
                    document.getElementById("lang").innerText = lon;
                    document.getElementById("reg").innerText = reg;


                    // Display the timezone
                    document.getElementById("timezone").textContent = timezone;
                    document.getElementById('pincode').textContent=pincode;
                    // Get the current time in the user's timezone
                    const currentTime = new Date().toLocaleTimeString("en-US", {
                        timeZone: timezone
                    });

                    document.getElementById("time").textContent = currentTime +" || " + currentDate;


                    const mapDiv = document.getElementById("map");
                    mapDiv.innerHTML = `<iframe width="100%" height="400" src="https://maps.google.com/maps?q=${lat},${lon}&output=embed"></iframe>`;

                    // Fetch postal offices using the pincode
                    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
                        .then(response => response.json())
                        .then(postalData => {

                            // Create a list of post offices
                            const card= document.getElementById('cc');

                            postalData[0].PostOffice.forEach(postOffice => {
                                const postOfficeName = postOffice.Name.toLowerCase();
                                const branchType = postOffice.BranchType.toLowerCase();
                                const status= postOffice.DeliveryStatus.toLowerCase();
                                const Dist= postOffice.District.toLowerCase();
                                const Divi= postOffice.Division.toLowerCase();

                                const div =document.createElement('div');
                                div.setAttribute('id', 'card');
                                div.innerHTML=`<ul>
                                    <p>Name: <span style="font-weight: 700;" id="nm">${postOfficeName}</span></p>
                                    <p>Branch Type: <span style="font-weight: 700;" id="ty">${branchType} </span></p>
                                    <p>Delivery Status: <span style="font-weight: 700;" id="ds">${status} </span></p>
                                    <p>District: <span style="font-weight: 700;" id="dt">${Dist}</span></p>
                                    <p>Division: <span style="font-weight: 700;" id="dv">${Divi}</span></p>
                                </ul>`
                                card.appendChild(div)
                            });

                            // Add filtering functionality
                            document.getElementById("search").addEventListener("input", function() {
                                const searchTerm = this.value.toLowerCase();
                                
                                card.innerHTML=``;

                                postalData[0].PostOffice.forEach(postOffice => {
                                    const postOfficeName = postOffice.Name.toLowerCase();
                                    const branchType = postOffice.BranchType.toLowerCase();
                                    const status= postOffice.DeliveryStatus.toLowerCase();
                                    const Dist= postOffice.District.toLowerCase();
                                    const Divi= postOffice.Division.toLowerCase();

                                    if (postOfficeName.includes(searchTerm) || branchType.includes(searchTerm)) {
                                        const div =document.createElement('div');
                                        div.setAttribute('id', 'card');
                                        div.innerHTML=`<ul>
                                            <p>Name: <span style="font-weight: 700;" id="nm">${postOfficeName}</span></p>
                                            <p>Branch Type: <span style="font-weight: 700;" id="ty">${branchType} </span></p>
                                            <p>Delivery Status: <span style="font-weight: 700;" id="ds">${status} </span></p>
                                            <p>District: <span style="font-weight: 700;" id="dt">${Dist}</span></p>
                                            <p>Division: <span style="font-weight: 700;" id="dv">${Divi}</span></p>
                                        </ul>`
                                        card.appendChild(div)
                                    }
                                });
                            });
                        })
                        .catch(error => {
                            console.error("Error fetching postal offices:", error);
                        });
                });
            })
            .catch(error => {
                console.error("Error fetching IP address:", error);
            });
        } catch (error) {
            console.log("Something went wrong  " + error )
        }
    }

    getIpAddress();
});
const main= document.getElementById('main');
const sec= document.getElementById('sec');
const btn= document.getElementById('fetchLocation')
btn.addEventListener('click', (()=>{
    main.style.display='none';
    sec.style.display='block'
}))
