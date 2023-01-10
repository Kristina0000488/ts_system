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

//console.log( searchSeller("Kristina") );

// 7 алгоритм Дейкстры

const graph = {
    start: {
        a: 6,
        b: 2,
    },
    a: {
        fin: 1,
    },
    b: {
        a: 3,
        fin: 5
    }
}

const infinity = Math.pow(10, 1000);

const costs = {
    a: 6,
    b: 2,
    fin: infinity
}

const parents = {
    a: 'start',
    b: 'start',
    in: null
}

const processed = [];

let node = findLowestCostNode(costs);
let cost = null;

while (node != null) {
    cost = costs[node];
    let neighbors = graph[node];

    for (let n in neighbors) {
        let newCost = cost + neighbors[n];

        if (costs[n] > newCost) {
            costs[n] = newCost;
            parents[n] = node;            
        }
    }   
    processed.push(node);

    node = findLowestCostNode(costs);
}

function findLowestCostNode(costs) {
    let lowestCost = infinity;
    let lowestCostNode = null;

    for (let _node in costs) {
        let cost = costs[_node];

        if (cost < lowestCost && !processed.includes(_node)) {
            lowestCost = cost;
            lowestCostNode = _node;
        }
    }
    return lowestCostNode;
}

//console.log(cost, costs, parents)

let states_needed = new Set([ 'mt', 'wa', 'or', 'id', 'nv', 'ut', 'ca', 'az' ]);
const stations = {
    kone: new Set([ 'id', 'nv', 'ut' ]),
    ktwo: new Set([ 'wa', 'id', 'mt' ]),
    kthree: new Set([ 'or', 'nv', 'ca' ]),
    kfour: new Set([ 'nv', 'ut' ]),
    kfive: new Set([ 'ca', 'az' ]),
};
const final_stations = new Set([]);


while (states_needed.size != 0) {
    let best_station = null;
    let states_covered = new Set();

    for (const [station, states] of Object.entries(stations)) {
        let covered = new Set([ ...states_needed ].filter( i => states.has(i) ));
        //console.log(states_covered.size, covered, '  -sizes');

        if ( covered.size > states_covered.size ) {//
            best_station = station;
            states_covered = new Set([...states_covered, ...covered]);
            //console.log(states_covered, '  -states_covered');
            //console.log(covered, '  -covered');

        }
    }

    //states_needed = states_needed - states_covered;
    //states_needed.forEach( x => !states_covered.has(x) );
    let new_needed = new Set([ ...states_needed ].filter( i => !states_covered.has(i) ));
    states_needed = new_needed;

    //console.log(new_needed, ' - states_needed');

    final_stations.add(best_station);
    //console.log(final_stations, ' - final_stations');
}

