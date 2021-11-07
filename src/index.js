let form = document.forms[0];



form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let formData = new FormData(e.target);
    let o = {};
    for (let [key, value] of formData.entries()){
        o[key] = value;
    };
    let file = o.upload;
 
    let fileReader = new FileReader();

    fileReader.readAsText(file);
    fileReader.onload = function(e){
        let csv = e.target.result;
        let dataset = csvToArray(csv); 
        console.log(dataset);
    };
    fileReader.onerror = function(err){
        console.log(err.message);
    }
});


function csvToArray(csv){
    csv = csv.split(",");
    csv = csv.join("");
    csv = csv.split("\r\n");

    let header = csv.shift().split("");
    let data = csv; 
    let arr = [];

    
    for (let i = 0; i < data.length; i++){
        if (data[i]){
            let rowData = data[i].split("");
            let row = {};
            for (let r = 0;r < rowData.length; r++){
                row[header[r]]=rowData[r];
            };
            arr.push(row);
            row = {};
        }
    };
    return arr;
}