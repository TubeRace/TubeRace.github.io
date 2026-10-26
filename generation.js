async function generate(){
    let start = document.getElementById("Start").value;
    let end = document.getElementById("End").value;
    let sameLine = true;
    let station1 = "";
    let station2 = "";
    let station3 = "";
    let station4 = "";
    let station5 = "";

    if (document.getElementById("DLR").value != "NoDLR"){
        Object.assign(tubeZones, DLRZones);
        Object.assign(tubeLines, DLRLines);
    };
    
    if (document.getElementById("OG").value != "NoOG"){
        Object.assign(tubeZones, OGZones);
        Object.assign(tubeLines, OGLines);
    };
    
    if (document.getElementById("EL").value == true){
        Object.assign(tubeZones, ELZones);
        Object.assign(tubeLines, ELLines);
    };


    let stationList = Object.keys(tubeZones);

    document.getElementById('station1').innerHTML = station1;
    document.getElementById('station2').innerHTML = station2;
    document.getElementById('station3').innerHTML = station3;
    document.getElementById('station4').innerHTML = station4;
    document.getElementById('station5').innerHTML = station5;

    if (start == end){
        station1 = "Start and Finish Line must be different";
        sameLine = false;
    }
    
    while (sameLine) {
        
        if (document.getElementById("mode").value == "Short"){
            station1 = zone1(stationList, start,end);
            stationList = remove(stationList, station1);
            station2 = zone1(stationList);
            stationList = remove(stationList, station2);
            station3 = zone1(stationList);
            stationList = remove(stationList, station3);
            station4 = zone2(stationList);
            stationList = remove(stationList, station4);
            station5 = zone2(stationList,start,end);
            stationList = remove(stationList, station5);            
        };
        
        if (document.getElementById("mode").value == "Medium"){
            station1 = zone1(stationList, start,end);
            stationList = remove(stationList, station1);
            station2 = zone1(stationList);
            stationList = remove(stationList, station2);
            station3 = zone1or2(stationList);
            stationList = remove(stationList, station3);
            station4 = zone2(stationList);
            stationList = remove(stationList, station4);
            station5 = zone3(stationList,start,end);
            stationList = remove(stationList, station5);            
        };

        if (document.getElementById("mode").value == "Long"){
            station1 = zone1(stationList, start,end);
            stationList = remove(stationList, station1);
            station2 = zone2(stationList);
            stationList = remove(stationList, station2);
            station3 = zone3(stationList);
            stationList = remove(stationList, station3);
            station4 = zone4(stationList);
            stationList = remove(stationList, station4);
            station5 = zone5(stationList,start,end);
            stationList = remove(stationList, station5);            
        };

        if (document.getElementById("mode").value == "Madness"){
            station1 = anyZone(stationList, start,end);
            stationList = remove(stationList, station1);
            station2 = anyZone(stationList, start,end);
            stationList = remove(stationList, station2);
            station3 = anyZone(stationList, start,end);
            stationList = remove(stationList, station3);
            station4 = anyZone(stationList, start,end);
            stationList = remove(stationList, station4);
            station5 = anyZone(stationList,start,end);
            stationList = remove(stationList, station5);            
        };
        
        const linesList = [...tubeLines[station1], ...tubeLines[station2], ...tubeLines[station3], ...tubeLines[station4], ...tubeLines[station5]];
        
        let lineCount = linesList.reduce((acc, curr) => {
            acc[curr] = (acc[curr] || 0) + 1;
            return acc;
        }, {});
        
        if (Math.max(...Object.values(lineCount)) < 4 && (lineCount["DLR"] < 3 || Object.keys(lineCount).includes("DLR") == false)){
            sameLine = false;
        }

    }
    
    if (start != end){
        loading(stationList, 5000, 'station1',station1);
        loading(stationList, 10000, 'station2', station2);
        loading(stationList, 15000, 'station3', station3);
        loading(stationList, 20000, 'station4',station4);
        loading(stationList, 25000, 'station5',station5);        
    }
    else{
        document.getElementById('station1').innerHTML = station1;
    }

}

function zone1(stationList, start, end){
    let station = stationList[Math.floor(Math.random()*stationList.length)];
        
    while (tubeZones[station] != 1 || station == start || station == end){
        station = stationList[Math.floor(Math.random()*stationList.length)];
        station = reduceDLR(station, stationList);
        station = reduceOG(station, stationList);
    }
    
    return station;    
}

function zone2(stationList){
    let station = stationList[Math.floor(Math.random()*stationList.length)];
        
    while (tubeZones[station] != 2){
        station = stationList[Math.floor(Math.random()*stationList.length)];
        station = reduceDLR(station, stationList);
        station = reduceOG(station, stationList);
    }
    
    return station;    
}


function zone3(stationList){
    let station = stationList[Math.floor(Math.random()*stationList.length)];
    
    while (tubeZones[station] != 3){
        station = stationList[Math.floor(Math.random()*stationList.length)];
        station = reduceDLR(station, stationList);
        station = reduceOG(station, stationList);
    }

    return station;    
}

function zone4(stationList){
    let station = stationList[Math.floor(Math.random()*stationList.length)];
    
    while (tubeZones[station] != 4){
        station = stationList[Math.floor(Math.random()*stationList.length)];
        station = reduceDLR(station, stationList);
        station = reduceOG(station, stationList);
    }

    return station;    
}

function zone5(stationList){
    let station = stationList[Math.floor(Math.random()*stationList.length)];
    
    while (tubeZones[station] != 5){
        station = stationList[Math.floor(Math.random()*stationList.length)];
        station = reduceDLR(station, stationList);
        station = reduceOG(station, stationList);
    }

    return station;    
}

function anyZone(stationList, start, end){
    
    let station = stationList[Math.floor(Math.random()*stationList.length)];
        
    while (station == start || station == end){
        station = stationList[Math.floor(Math.random()*stationList.length)];
        station = reduceDLR(station, stationList);
        station = reduceOG(station, stationList);
    }
    return station;    
}

function zone1or2(stationList, start, end){
    let station = stationList[Math.floor(Math.random()*stationList.length)];
        
    while (tubeZones[station] > 2 || station == start || station == end){
        station = stationList[Math.floor(Math.random()*stationList.length)];
        station = reduceDLR(station, stationList);
        station = reduceOG(station, stationList);
    }
    
    return station;    
}

function reduceDLR(station, stationList){
    if (document.getElementById("DLR").value == "ReducedDLR"){
        let reroll = Math.floor(Math.random()*2);
        DLRStations = Object.keys(DLRZones);
        if (DLRStations.includes(station) && reroll == 1){
            station = stationList[Math.floor(Math.random()*stationList.length)];
        }
    }
    return station;
}

function reduceOG(station, stationList){
    if (document.getElementById("OG").value == "ReducedOG"){
        let reroll = Math.floor(Math.random()*2);
        OGStations = Object.keys(OGZones);
        if (OGStations.includes(station) && reroll == 1){
            station = stationList[Math.floor(Math.random()*stationList.length)];
        }
    }
    return station;
}

function remove(stationList, station){
    var index = stationList.indexOf(station);
    if (index > -1){
        stationList.splice(index, 1);
    }
    return stationList;
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function loading(stationList,ms,id, station){

    for (let i = 0; i < ms; i= i+5){
        document.getElementById(id).innerHTML = stationList[Math.floor(Math.random()*stationList.length)];
        await sleep(3)
    }
    document.getElementById(id).innerHTML = station
}



const tubeZones = {"Acton Town" : 3,
"Aldgate": 1,
"Aldgate East" : 1,
"Alperton" : 4,
"Amersham" : 9,
"Angel" : 1,
"Archway" : 3,
"Arnos Grove" : 4,
"Arsenal" : 2,
"Baker Street" : 1,
"Balham" : 3,
"Bank" : 1,
"Barbican" : 1,
"Barking" : 4,
"Barkingside": 4,
"Barons Court" : 2,
"Bayswater" : 1,
"Becontree" : 5,
"Belsize Park" : 2,
"Bermondsey" : 2,
"Bethnal Green" : 2,
"Blackfriars" : 1,
"Blackhorse Road" : 3,
"Bond Street" : 1,
"Borough" : 1,
"Boston Manor" : 4,
"Bounds Green" : 4,
"Bow Road" : 1,
"Brent Cross" : 3,
"Brixton" : 2,
"Bromley-By-Bow" : 3,
"Buckhurst Hill" : 5,
"Burnt Oak" : 4,
"Caledonian Road" : 2,
"Camden Town" : 2,
"Canada Water" : 2,
"Canary Wharf" : 2,
"Canning Town" : 3,
"Cannon Street" : 1,
"Canons Park" : 5,
"Chalfont & Latimer": 8, 
"Chalk Farm" : 2,
"Chancery Lane" : 1,
"Charing Cross" : 1,
"Chesham": 9,
"Chigwell": 4,
"Chiswick Park" : 3,
"Chorleywood": 7,
"Clapham Common" : 2,
"Clapham North" : 2,
"Clapham South" : 3,
"Cockfosters" : 5,
"Colindale" : 4,
"Colliers Wood" : 3,
"Covent Garden" : 1,
"Croxley" : 7,
"Dagenham East" : 5,
"Dagenham Heathway" : 5,
"Debden" : 6,
"Dollis Hill" : 3,
"Ealing Broadway" : 3,
"Ealing Common" : 3,
"Earl's Court" : 2,
"East Acton" : 2,
"East Finchley" : 3,
"East Ham" : 4,
"East Putney" : 3,
"Eastcote" : 5,
"Edgeware" : 5,
"Edgware Road" : 1,
"Elephant & Castle" : 1,
"Elm Park" : 6,
"Embankment" : 1,
"Epping": 6,
"Euston" : 1,
"Euston Square" : 1,
"Fairlop" : 4,
"Farringdon" : 1,
"Finchley Central" : 4,
"Finchley Road" : 2,
"Finsbury Park" : 2,
"Fulham Broadway" : 2,
"Gants Hill": 4,
"Gloucester Road" : 1,
"Golders Green" : 3,
"Goldhawk Road" : 2,
"Goodge Street" : 1,
"Grange Hill": 4,
"Great Portland Street" : 1,
"Greenford": 4,
"Green Park" : 1,
"Gunnersbury" : 3,
"Hainault" : 4,
"Hammersmith" : 2,
"Hampstead" : 3,
"Hanger Lane" : 3,
"Harlesden" : 3,
"Harrow & Wealdstone": 5,
"Harrow-on-the-Hill": 5,
"Hatton Cross": 6,
"Heathrow Terminals 2 & 3" : 6,
"Heathrow Terminal 4" : 6,
"Heathrow Terminal 5" : 6,
"Hendon Central" : 4,
"High Barnet" : 5,
"High Street Kensington" : 1,
"Highbury & Islington" : 2,
"Highgate" : 3,
"Hillingdon" : 6,
"Holborn" : 1,
"Holland Park" : 2,
"Holloway Road" : 2,
"Hornchurch": 6,
"Hounslow Central" : 4,
"Hounslow East" : 4,
"Hounslow West": 5,
"Hyde Park Corner" : 1,
"Ickenham": 6,
"Kennington" : 2,
"Kensal Green" : 2,
"Kensington (Olympia)" : 2,
"Kentish Town" : 2,
"Kenton": 4,
"Kew Gardens" : 4,
"Kilburn" : 2,
"Kilburn Park" : 2,
"Kingsbury": 4,
"King's Cross St. Pancras" : 1,
"Knightsbridge" : 1,
"Ladbroke Grove" : 2,
"Lambeth North" : 1,
"Lancaster Gate" : 1,
"Latimer Road" : 2,
"Leicester Square" : 1,
"Leyton" : 3,
"Leytonstone": 4,
"Liverpool Street" : 1,
"London Bridge" : 1,
"Loughton" : 6,
"Maida Vale" : 2,
"Manor House" : 3,
"Mansion House" : 1,
"Marble Arch" : 1,
"Marylebone" : 1,
"Mile End" : 2,
"Mill Hill East" : 4,
"Monument" : 1, 
"Moorgate" : 1,
"Moor Park" : 6,
"Morden": 4,
"Mornington Crescent" : 2,
"Neasden" : 3,
"Newbury Park": 4,
"North Acton" : 3,
"North Ealing" : 3,
"North Greenwich" : 3,
"North Harrow": 5,
"North Wembley": 4,
"Northfields" : 3,
"Northolt": 5,
"Northwick Park": 4,
"Northwood": 6,
"Northwood Hills" : 6,
"Notting Hill Gate" : 2,
"Oakwood": 5,
"Old Street" : 1,
"Osterley" : 4,
"Oval" : 2,
"Oxford Circus" : 1,
"Paddington" : 1,
"Park Royal" : 3,
"Parsons Green" : 2,
"Perivale": 4,
"Picadilly Circus" : 1,
"Pimlico" : 1,
"Pinner": 5,
"Plaistow" : 3,
"Preston Road": 4,
"Putney Bridge" : 2,
"Queen's Park" : 2,
"Queensbury" : 4,
"Queensway" : 1,
"Ravenscourt Park" : 2,
"Rayners Lane": 5,
"Redbridge": 4,
"Regent's Park" : 1,
"Richmond": 4,
"Rickmansworth": 7,
"Roding Valley": 4,
"Royal Oak" : 2,
"Ruislip": 6,
"Ruislip Gardens": 5,
"Ruislip Manor": 6,
"Russell Square" : 1,
"Seven Sisters" : 3,
"Shepherd's Bush" : 2,
"Shepherd's Bush Market": 2,
"Sloane Square" : 1,
"Snaresbrook": 4,
"South Ealing" : 3,
"South Harrow": 5,
"South Kensington" : 1,
"South Kenton" : 4,
"South Ruislip": 5,
"South Wimbledon": 4,
"South Woodford": 4,
"Southfields" : 3,
"Southgate": 4,
"Southwark" : 1,
"St. James's Park" : 1,
"St. John's Wood" : 2,
"St. Paul's" : 1,
"Stamford Brook" : 2,
"Stanmore": 5,
"Stepney Green" : 2,
"Stockwell" : 2,
"Stonebridge Park" : 3,
"Stratford" : 3,
"Sudbury Town": 4,
"Sudbury Hill": 4,
"Swiss Cottage" : 2,
"Temple" : 1,
"Theydon Bois": 6,
"Tooting Bec" : 3,
"Tooting Broadway" : 3,
"Tottenham Court Road" : 1,
"Tottenham Hale" : 3,
"Totteridge & Whetstone": 4,
"Tower Hill" : 1,
"Tufnell Park" : 2,
"Turnham Green" : 3,
"Turnpike Lane" : 3,
"Upminster": 6,
"Upminster Bridge": 6,
"Upney": 4,
"Upton Park" : 3,
"Uxbridge": 6,
"Vauxhall" : 2,
"Victoria" : 1,
"Walthamstow Central" : 3,
"Wanstead": 4,
"Warren Street" : 1,
"Warwick Avenue" : 2,
"Waterloo" : 1,
"Watford": 7,
"Wembley Central": 4,
"Wembley Park": 4,
"West Acton" : 3,
"West Brompton" : 2,
"West Finchley": 4,
"West Ham" : 3,
"West Hampstead" : 2,
"West Harrow": 5,
"West Kensington" : 2,
"West Ruislip": 6,
"Westbourne Park" : 2,
"Westminster" : 1,
"White City" : 2,
"Whitechapel" : 2,
"Willesden Green" : 3,
"Willesden Junction" : 3,
"Wimbledon" : 3,
"Wimbledon Park" : 3,
"Wood Green" : 3,
"Wood Lane": 2,
"Woodford": 4,
"Woodside Park": 4,
"Battersea Power Station": 1,
"Nine Elms" : 1,
};

const tubeLines = {"Acton Town" : ["D","P"],
"Aldgate": ["M","Ci"],
"Aldgate East" : ["H", "D"],
"Alperton" : ["P"],
"Amersham" : ["M"],
"Angel" : ["N"],
"Archway" : ["N"],
"Arnos Grove" : ["P"],
"Arsenal" : ["P"],
"Baker Street" : ["M", "B", "Ci", "J","H"],
"Balham" : ["N"],
"Bank" : ["W","N", "Ce", "DLR"],
"Barbican" : ["M", "Ci"],
"Barking" : ["Di", "H", "Su"],
"Barkingside": ["C"],
"Barons Court" : ["D","P"],
"Bayswater" : ["D", "Ci"],
"Becontree" : ["D"],
"Belsize Park" : ["N"],
"Bermondsey" : ["J"],
"Bethnal Green" : ["Ce", "We"],
"Blackfriars" : ["D", "Ci"],
"Blackhorse Road" : ["V", "Su"],
"Bond Street" : ["Ce", "J", "E"],
"Borough" : ["N"],
"Boston Manor" : ["P"],
"Bounds Green" : ["P"],
"Bow Road" : ["D", "H"],
"Brent Cross" : ["N"],
"Brixton" : ["V"],
"Bromley-By-Bow" : ["D", "H"],
"Buckhurst Hill" : ["Ce"],
"Burnt Oak" : ["N"],
"Caledonian Road" : ["P"],
"Camden Town" : ["N"],
"Canada Water" : ["J", "Wi"],
"Canary Wharf" : ["J", "DLR", "E"],
"Canning Town" : ["J", "DLR"],
"Cannon Street" : ["D", "Ci"],
"Canons Park" : ["J"],
"Chalfont & Latimer": ["M"],
"Chalk Farm" : ["N"],
"Chancery Lane" : ["Ce"],
"Charing Cross" : ["B", "N"],
"Chesham": ["M"],
"Chigwell": ["Ce"],
"Chiswick Park" : ["D"],
"Chorleywood": ["M"],
"Clapham Common" : ["N"],
"Clapham North" : ["N"],
"Clapham South" : ["N"],
"Cockfosters" : ["P"],
"Colindale" : ["N"],
"Colliers Wood" : ["N"],
"Covent Garden" : ["P"],
"Croxley" : ["M"],
"Dagenham East" : ["D"],
"Dagenham Heathway" : ["D"],
"Debden" : ["Ce"],
"Dollis Hill" : ["J"],
"Ealing Broadway" : ["D","Ce", "E"],
"Ealing Common" : ["D","P"],
"Earl's Court" : ["D","P"],
"East Acton" : ["Ce"],
"East Finchley" : ["N"],
"East Ham" : ["D", "H"],
"East Putney" : ["D"],
"Eastcote" : ["M", "P"],
"Edgeware" : ["N"],
"Edgware Road" : ["B", "H", "D", "Ci"],
"Elephant & Castle" : ["N", "B"],
"Elm Park" : ["D"],
"Embankment" : ["D", "B", "N", "Ci"],
"Epping": ["Ce"],
"Euston" : ["N", "V","Lio"],
"Euston Square" : ["M", "Ci", "H"],
"Fairlop" : ["Ce"],
"Farringdon" : ["M", "Ci", "H", "E"],
"Finchley Central" : ["N"],
"Finchley Road" : ["M", "J"],
"Finsbury Park" : ["P", "V"],
"Fulham Broadway" : ["D"],
"Gants Hill": ["Ce"],
"Gloucester Road" : ["D", "Ci", "P"],
"Golders Green" : ["N"],
"Goldhawk Road" : ["H", "Ci"],
"Goodge Street" : ["N"],
"Grange Hill": ["Ce"],
"Great Portland Street" : ["M", "Ci", "H"],
"Greenford": ["Ce"],
"Green Park" : ["P", "V", "J"],
"Gunnersbury" : ["D", "Mi"],
"Hainault" : ["Ce"],
"Hammersmith" : ["D", "P", "H", "Ci"],
"Hampstead" : ["N"],
"Hanger Lane" : ["N"],
"Harlesden" : ["B", "Lio"],
"Harrow & Wealdstone": ["B", "Lio"],
"Harrow-on-the-Hill": ["M"],
"Hatton Cross": ["P"],
"Heathrow Terminals 2 & 3" : ["P", "E"],
"Heathrow Terminal 4" : ["P", "E"],
"Heathrow Terminal 5" : ["P", "E"],
"Hendon Central" : ["N"],
"High Barnet" : ["N"],
"High Street Kensington" : ["D", "Ci"],
"Highbury & Islington" : ["V", "Mi", "Wi"],
"Highgate" : ["N"],
"Hillingdon" : ["M", "P"],
"Holborn" : ["Ce", "P"],
"Holland Park" : ["Ce"],
"Holloway Road" : ["P"],
"Hornchurch": ["D"],
"Hounslow Central" : ["P"],
"Hounslow East" : ["P"],
"Hounslow West": ["P"],
"Hyde Park Corner" : ["P"],
"Ickenham": ["M", "P"],
"Kennington" : ["N"],
"Kensal Green" : ["B", "Lio"],
"Kensington (Olympia)" : ["D", "Mi"],
"Kentish Town" : ["N"],
"Kenton": ["B", "Lio"],
"Kew Gardens" : ["D", "Mi"],
"Kilburn" : ["J"],
"Kilburn Park" : ["B"],
"Kingsbury": ["J"],
"King's Cross St. Pancras" : ["M", "N", "P", "Ci", "V", "H"],
"Knightsbridge" : ["P"],
"Ladbroke Grove" : ["H", "Ci"],
"Lambeth North" : ["B"],
"Lancaster Gate" : ["Ce"],
"Latimer Road" : ["H", "Ci"],
"Leicester Square" : ["P", "N"],
"Leyton" : ["Ce"],
"Leytonstone": ["Ce"],
"Liverpool Street" : ["M", "Ce", "Ci", "H", "E", "We"],
"London Bridge" : ["N", "J"],
"Loughton" : ["Ce"],
"Maida Vale" : ["B"],
"Manor House" : ["P"],
"Mansion House" : ["D", "Ci"],
"Marble Arch" : ["Ce"],
"Marylebone" : ["B"],
"Mile End" : ["D", "H", "Ce"],
"Mill Hill East" : ["N"],
"Monument" : ["D", "Ci"], 
"Moorgate" : ["M", "N", "Ci", "H"],
"Moor Park" : ["M"],
"Morden": ["N"],
"Mornington Crescent" : ["N"],
"Neasden" : ["J"],
"Newbury Park": ["Ce"],
"North Acton" : ["Ce"],
"North Ealing" : ["P"],
"North Greenwich" : ["J"],
"North Harrow": ["M"],
"North Wembley": ["B", "Lio"],
"Northfields" : ["P"],
"Northolt": ["Ce"],
"Northwick Park": ["M"],
"Northwood": ["M"],
"Northwood Hills" : ["M"],
"Notting Hill Gate" : ["D", "Ce", "Ci"],
"Oakwood": ["P"],
"Old Street" : ["N"],
"Osterley" : ["P"],
"Oval" : ["N"],
"Oxford Circus" : ["Ce", "B", "V"],
"Paddington" : ["H", "D", "Ci", "B", "E"],
"Park Royal" : ["P"],
"Parsons Green" : ["D"],
"Perivale": ["Ce"],
"Picadilly Circus" : ["B", "P"],
"Pimlico" : ["V"],
"Pinner": ["M"],
"Plaistow" : ["D", "H"],
"Preston Road": ["M"],
"Putney Bridge" : ["D"],
"Queen's Park" : ["B", "Lio"],
"Queensbury" : ["J"],
"Queensway" : ["Ce"],
"Ravenscourt Park" : ["D"],
"Rayners Lane": ["M", "P"],
"Redbridge": ["Ce"],
"Regent's Park" : ["B"],
"Richmond": ["D", "Mi"],
"Rickmansworth": ["M"],
"Roding Valley": ["Ce"],
"Royal Oak" : ["H", "Ci"],
"Ruislip": ["M", "P"],
"Ruislip Gardens": ["Ce"],
"Ruislip Manor": ["M", "P"],
"Russell Square" : ["P"],
"Seven Sisters" : ["V", "We"],
"Shepherd's Bush" : ["Ce", "Mi"],
"Shepherd's Bush Market": ["H", "Ci"],
"Sloane Square" : ["D", "Ci"],
"Snaresbrook": ["Ce"],
"South Ealing" : ["P"],
"South Harrow": ["P"],
"South Kensington" : ["D", "P", "Ci"],
"South Kenton" : ["B", "Lio"],
"South Ruislip": ["Ce"],
"South Wimbledon": ["N"],
"South Woodford": ["Ce"],
"Southfields" : ["D"],
"Southgate": ["P"],
"Southwark" : ["J"],
"St. James's Park" : ["D", "Ci"],
"St. John's Wood" : ["J"],
"St. Paul's" : ["C"],
"Stamford Brook" : ["D"],
"Stanmore": ["J"],
"Stepney Green" : ["D", "H"],
"Stockwell" : ["N", "V"],
"Stonebridge Park" : ["B", "Lio"],
"Stratford" : ["DLR", "Ce", "J", "Mi", "E"],
"Sudbury Town": ["P"],
"Sudbury Hill": ["P"],
"Swiss Cottage" : ["J"],
"Temple" : ["D", "Ci"],
"Theydon Bois": ["Ce"],
"Tooting Bec" : ["N"],
"Tooting Broadway" : ["N"],
"Tottenham Court Road" : ["C", "N", "E"],
"Tottenham Hale" : ["V"],
"Totteridge & Whetstone": ["N"],
"Tower Hill" : ["D", "Ci"],
"Tufnell Park" : ["N"],
"Turnham Green" : ["D", "P"],
"Turnpike Lane" : ["P"],
"Upminster": ["D", "Lib"],
"Upminster Bridge": ["D"],
"Upney": ["D"],
"Upton Park" : ["D", "H"],
"Uxbridge": ["M", "P"],
"Vauxhall" : ["V"],
"Victoria" : ["D", "Ci", "V"],
"Walthamstow Central" : ["V", "We"],
"Wanstead": ["Ce"],
"Warren Street" : ["N"],
"Warwick Avenue" : ["B"],
"Waterloo" : ["W", "B", "N", "J"],
"Watford": ["M"],
"Wembley Central": ["B", "Lio"],
"Wembley Park": ["M", "J"],
"West Acton" : ["C"],
"West Brompton" : ["D", "Mi"],
"West Finchley": ["N"],
"West Ham" : ["DLR", "D", "H", "J"],
"West Hampstead" : ["J", "Mi"],
"West Harrow": ["M"],
"West Kensington" : ["D"],
"West Ruislip": ["Ce"],
"Westbourne Park" : ["H", "Ci"],
"Westminster" : ["D", "Ci", "J"],
"White City" : ["C"],
"Whitechapel" : ["D", "H", "E", "Wi"],
"Willesden Green" : ["J"],
"Willesden Junction" : ["B", "Lio", "Mi"],
"Wimbledon" : ["D"],
"Wimbledon Park" : ["D"],
"Wood Green" : ["P"],
"Wood Lane": ["H", "Ci"],
"Woodford": ["Ce"],
"Woodside Park": ["N"],
"Battersea Power Station": ["N"],
"Nine Elms" : ["N"],
};

const DLRZones = { "Abbey Road" : 3,
    "All Saints" : 2,
    "Beckton": 3,
    "Beckton Park": 3,
    "Blackwall": 2,
    "Bow Church": 2,
    "Crossharbour": 2,
    "Custom House": 3,
    "Cutty Sark for Maritime Greenwich" : 3,
    "Cyprus": 3,
    "Deptford Bridge": 3,
    "Devons Road": 2,
    "East India": 3,
    "Elverson Road": 3,
    "Gallions Reach": 3,
    "Greenwich": 3,
    "Heron Quays": 2,
    "Island Gardens": 2,
    "King George V": 3,
    "Langdon Park": 2,
    "Lewisham": 3,
    "Limehouse": 2,
    "London City Airport": 3,
    "Mudchute": 2,
    "Pontoon Dock": 3,
    "Poplar": 2,
    "Prince Regent": 3,
    "Pudding Mill Lane": 3,
    "Royal Albert": 3,
    "Royal Victoria": 3,
    "Shadwell": 2,
    "South Quay": 2,
    "Star Lane": 3,
    "Stratford High Street": 3,
    "Stratford International": 3,
    "Tower Gateway": 1,
    "West India Quay": 2,
    "West Silvertown": 3,
    "Westferry": 2,
    "Woolwich Arsenal": 4
};

const DLRLines = {"Abbey Road" : ["DLR"],
    "All Saints" : ["DLR"],
    "Beckton": ["DLR"],
    "Beckton Park": ["DLR"],
    "Blackwall": ["DLR"],
    "Bow Church": ["DLR"],
    "Crossharbour": ["DLR"],
    "Custom House": ["DLR", "E"],
    "Cutty Sark for Maritime Greenwich" : ["DLR"],
    "Cyprus": ["DLR"],
    "Deptford Bridge": ["DLR"],
    "Devons Road": ["DLR"],
    "East India": ["DLR"],
    "Elverson Road": ["DLR"],
    "Gallions Reach": ["DLR"],
    "Greenwich": ["DLR"],
    "Heron Quays": ["DLR"],
    "Island Gardens": ["DLR"],
    "King George V": ["DLR"],
    "Langdon Park": ["DLR"],
    "Lewisham": ["DLR"],
    "Limehouse": ["DLR"],
    "London City Airport": ["DLR"],
    "Mudchute": ["DLR"],
    "Pontoon Dock": ["DLR"],
    "Poplar": ["DLR"],
    "Prince Regent": ["DLR"],
    "Pudding Mill Lane": ["DLR"],
    "Royal Albert": ["DLR"],
    "Royal Victoria": ["DLR"],
    "Shadwell": ["DLR", "Wi"],
    "South Quay": ["DLR"],
    "Star Lane": ["DLR"],
    "Stratford High Street": ["DLR"],
    "Stratford International": ["DLR"],
    "Tower Gateway": ["DLR"],
    "West India Quay": ["DLR"],
    "West Silvertown": ["DLR"],
    "Westferry": ["DLR"],
    "Woolwich Arsenal": ["DLR"]
};

const ElZones = { "West Drayton": 6,
    "Hayes and Harlington": 5,
    "Southall": 4,
    "Hanwell": 4,
    "West Ealing": 3,
    "Acton Main Line": 3,
    "Maryland": 3,
    "Forest Gate": 3,
    "Manor Park": 4,
    "Ilford": 4,
    "Seven Kings": 4,
    "Goodmayes": 4,
    "Chadwell Heath": 5,
    "Romford": 6,
    "Gidea Park": 6,
    "Harold Wood": 6,
    "Brentwood": 9,
    "Abbey Wood": 4,
    "Woolwich": 4,
    "Custom House": 3
};

const ElLines = { "West Drayton": ["E"],
    "Hayes and Harlington": ["E"],
    "Southall": ["E"],
    "Hanwell": ["E"],
    "West Ealing": ["E"],
    "Acton Main Line": ["E"],
    "Maryland": ["E"],
    "Forest Gate": ["E"],
    "Manor Park": ["E"],
    "Ilford": ["E"],
    "Seven Kings": ["E"],
    "Goodmayes": ["E"],
    "Chadwell Heath": ["E"],
    "Romford": ["E", "Lib"],
    "Gidea Park": ["E"],
    "Harold Wood": ["E"],
    "Brentwood": ["E"],
    "Abbey Wood": ["E"],
    "Woolwich": ["E"],
    "Custom House": ["E", "DLR"]
};

const OGZones = { "Romford": 6,
    "Emerson Park": 6,
    "Watford High Street": 8,
    "Bushey": 8,
    "Carpenders Park": 7,
    "Hatch End": 6, 
    "Headstone Lane": 5,
    "Kilburn High Road": 2,
    "South Hampstead": 2,
    "South Acton": 3,
    "Acton Central": 3,
    "Imperial Wharf": 2,
    "Clapham Junction": 2,
    "Kensal Rise": 2,
    "Brondesbury Park": 2,
    "Brondesbury": 2,
    "Finchley Road & Frognal": 2,
    "Hampstead Heath": 2,
    "Gospel Oak": 2, 
    "Kentish Town West": 2,
    "Camden Road": 2,
    "Caledonian Road & Barnsbury": 2, 
    "Canonbury": 2,
    "Dalston Kingsland": 2,
    "Hackney Central": 2,
    "Homerton": 2,
    "Hackney Wick": 2,
    "Dalston Junction": 2,
    "Haggerston": 2,
    "Hoxton": 2,
    "Shoreditch High Street": 1,
    "Shadwell": 2,
    "Wapping": 2,
    "Rotherhide": 2,
    "Surrey Quays": 2,
    "New Cross": 2,
    "New Cross Gate": 2,
    "Brockley": 2,
    "Honor Oak Park": 3,
    "Forest Hill": 3,
    "Sydenham": 3,
    "Penge West": 4,
    "Anerley": 4,
    "Norwood Junction": 4,
    "West Croydon": 5,
    "Crystal Palace": 4,
    "Queens Road Peckham": 2,
    "Peckham Rye": 2,
    "Denmark Hill": 2,
    "Clapham High Street": 2,
    "Wandsworth Road": 2,
    "Upper Holloway": 2,
    "Crouch Hill": 3,
    "Haringey Green Lanes": 3,
    "South Tottenham": 3,
    "Walthamstow Queen's Road": 3,
    "Leyton Midland Road": 3,
    "Leytonstone High Road": 3,
    "Wanstead Park": 3,
    "Woodgrange Park": 4,
    "Barking Riverside": 4,
    "Cambridge Heath": 2,
    "London Fields": 2,
    "Hackney Downs": 2,
    "Rectory Road": 2,
    "Stoke Newington": 2,
    "Stamford Hill": 3,
    "Bruce Grove": 3,
    "White Hart Lane": 3,
    "Silver Street": 4,
    "Edmonton Green": 4,
    "Bush Hill Park": 5,
    "Enfield Town": 5,
    "Southbury": 5,
    "Turkey Street": 6, 
    "Theobalds Grove": 7,
    "Cheshunt": 8,
    "Clapton": 3,
    "St James Street": 3,
    "Wood Street": 4,
    "Highams Park": 4,
    "Chingford": 5
};

const OGLines = { "Romford": ["Lib", "E"],
    "Emerson Park": ["Lib"],
    "Watford High Street": ["Lio"],
    "Bushey": ["Lio"],
    "Carpenders Park": ["Lio"],
    "Hatch End": ["Lio"], 
    "Headstone Lane": ["Lio"],
    "Kilburn High Road": ["Lio"],
    "South Hampstead": ["Lio"],
    "South Acton": ["Mi"],
    "Acton Central": ["Mi"],
    "Imperial Wharf": ["Mi"],
    "Clapham Junction": ["Mi", "Wi"],
    "Kensal Rise": ["Mi"],
    "Brondesbury Park": ["Mi"],
    "Brondesbury": ["Mi"],
    "Finchley Road & Frognal": ["Mi"],
    "Hampstead Heath": ["Mi"],
    "Gospel Oak": ["Mi", "Su"], 
    "Kentish Town West": ["Mi"],
    "Camden Road": ["Mi"],
    "Caledonian Road & Barnsbury": ["Mi"], 
    "Canonbury": ["Mi", "Wi"],
    "Dalston Kingsland": ["Mi"],
    "Hackney Central": ["Mi"],
    "Homerton": ["Mi"],
    "Hackney Wick": ["Mi"],
    "Dalston Junction": ["Wi"],
    "Haggerston": ["Wi"],
    "Hoxton": ["Wi"],
    "Shoreditch High Street": ["Wi"],
    "Shadwell": ["Wi"],
    "Wapping": ["Wi"],
    "Rotherhide": ["Wi"],
    "Surrey Quays": ["Wi"],
    "New Cross": ["Wi"],
    "New Cross Gate": ["Wi"],
    "Brockley": ["Wi"],
    "Honor Oak Park": ["Wi"],
    "Forest Hill": ["Wi"],
    "Sydenham": ["Wi"],
    "Penge West": ["Wi"],
    "Anerley": ["Wi"],
    "Norwood Junction": ["Wi"],
    "West Croydon": ["Wi"],
    "Crystal Palace": ["Wi"],
    "Queens Road Peckham": ["Wi"],
    "Peckham Rye": ["Wi"],
    "Denmark Hill": ["Wi"],
    "Clapham High Street": ["Wi"],
    "Wandsworth Road": ["Wi"],
    "Upper Holloway": ["Su"],
    "Crouch Hill": ["Su"],
    "Haringey Green Lanes": ["Su"],
    "South Tottenham": ["Su"],
    "Walthamstow Queen's Road": ["Su"],
    "Leyton Midland Road": ["Su"],
    "Leytonstone High Road": ["Su"],
    "Wanstead Park": ["Su"],
    "Woodgrange Park": ["Su"],
    "Barking Riverside": ["Su"],
    "Cambridge Heath": ["We"],
    "London Fields": ["We"],
    "Hackney Downs": ["We"],
    "Rectory Road": ["We"],
    "Stoke Newington": ["We"],
    "Stamford Hill": ["We"],
    "Bruce Grove": ["We"],
    "White Hart Lane": ["We"],
    "Silver Street": ["We"],
    "Edmonton Green": ["We"],
    "Bush Hill Park": ["We"],
    "Enfield Town": ["We"],
    "Southbury": ["We"],
    "Turkey Street": ["We"], 
    "Theobalds Grove": ["We"],
    "Cheshunt": ["We"],
    "Clapton": ["We"],
    "St James Street": ["We"],
    "Wood Street": ["We"],
    "Highams Park": ["We"],
    "Chingford": ["We"]
};
