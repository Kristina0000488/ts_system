const persons = { Kristina: [ 'Serg', "Meggi", 'Alex' ], Serg: [ "Alex" ], Meggi: [ ], Alex: [ ] };


function searchSeller(name) {
    let searching_arr = [];
    searching_arr.push(...persons[name]);
    const searched = {};

    while (searching_arr.length !== 0 ) {
        const person = searching_arr.shift();
        
        if (!searched[person]) {
            if (checkSeller(person)) {
                return person;
            } else { 
                searching_arr.push(...persons[person]);
                searched[person] = true;
                
                console.log(searching_arr, searched)
            }
        }    
        continue;    
    }
    
    return false;

}

function checkSeller(name) {// console.log(name)
    if (name.length === 0 ) return true;
    
    return false;
}

console.log( searchSeller("Kristina") );