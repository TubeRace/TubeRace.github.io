async function generate(){
    let start = "Liverpool Street";
    let end = "King's Cross St. Pancras";
    let sameLine = true;
    let station1 = "";
    let station2 = "";
    let station3 = "";
    let station4 = "";
    let station5 = "";


    document.getElementById('station1').innerHTML = station1;
    document.getElementById('station2').innerHTML = station2;
    document.getElementById('station3').innerHTML = station3;
    document.getElementById('station4').innerHTML = station4;
    document.getElementById('station5').innerHTML = station5;

    while (sameLine) {
        let stationList = Object.keys(tubeZones);

        station1 = zone1(stationList, start,end);
        stationList = remove(stationList, station1);
        station2 = zone2(stationList);
        stationList = remove(stationList, station2);
        station3 = zone3(stationList);
        stationList = remove(stationList, station3);
        station4 = zone1(stationList);
        stationList = remove(stationList, station4);
        station5 = zone1or2(stationList,start,end);
        stationList = remove(stationList, station5);
        
        const linesList = [...tubeLines[station1], ...tubeLines[station2], ...tubeLines[station3], ...tubeLines[station4], ...tubeLines[station5]];
        
        let lineCount = linesList.reduce((acc, curr) => {
            acc[curr] = (acc[curr] || 0) + 1;
            return acc;
        }, {});
        
        if (Math.max(...Object.values(lineCount)) < 4 && (lineCount["DLR"] < 3 || Object.keys(lineCount).includes("DLR") == false)){
            sameLine = false;
        }

    }
    document.getElementById('station1').innerHTML = station1;
    await sleep(5000);
    document.getElementById('station2').innerHTML = station2;
    await sleep(5000);
    document.getElementById('station3').innerHTML = station3;
    await sleep(5000);
    document.getElementById('station4').innerHTML = station4;
    await sleep(5000);
    document.getElementById('station5').innerHTML = station5;    
}

function zone1(stationList, start, end){
    let station = stationList[Math.floor(Math.random()*stationList.length)];
        
    while (tubeZones[station] != 1 || station == start || station == end){
        station = stationList[Math.floor(Math.random()*stationList.length)];
    }
    
    return station;    
}

function zone2(stationList){
    let station = stationList[Math.floor(Math.random()*stationList.length)];
        
    while (tubeZones[station] != 2){
        station = stationList[Math.floor(Math.random()*stationList.length)];
    }
    
    return station;    
}


function zone3(stationList){
    let station = stationList[Math.floor(Math.random()*stationList.length)];
    
    let DLROdds = Math.floor(Math.random()*5);
    if (DLROdds == 0){
       while (tubeZones[station] != 3 || tubeLines[station] != "DLR"){
            station = stationList[Math.floor(Math.random()*stationList.length)];
        }
    
    }
    else {
        while (tubeZones[station] != 3 || tubeLines[station] == ["DLR"]){
            station = stationList[Math.floor(Math.random()*stationList.length)];        
        }
    }
    return station;    
}

function zone1or2(stationList, start, end){
    let station = stationList[Math.floor(Math.random()*stationList.length)];
        
    while (tubeZones[station] == 3 || station == start || station == end){
        station = stationList[Math.floor(Math.random()*stationList.length)];
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

const tubeZones = {"Acton Town" : 3,
"Aldgate": 1,
"Aldgate East" : 1,
"All Saints" : 2,
"Angel" : 1,
"Archway" : 3,
"Arsenal" : 2,
"Baker Street" : 1,
"Balham" : 3,
"Bank" : 1,
"Barbican" : 1,
"Barons Court" : 2,
"Bayswater" : 1,
"Beckton" : 3,
"Beckton Park" : 3,
"Belsize Park" : 2,
"Bermondsey" : 2,
"Bethnal Green" : 2,
"Blackfriars" : 2,
"Blackhorse Road" : 3,
"Blackwall" : 2,
"Bond Street" : 1,
"Borough" : 1,
"Bow Church" : 2,
"Bow Road" : 1,
"Brent Cross" : 3,
"Brixton" : 2,
"Bromley-By-Bow" : 3,
"Caledonian Road" : 2,
"Camden Town" : 2,
"Canada Water" : 2,
"Canary Wharf" : 2,
"Canning Town" : 3,
"Cannon Street" : 1,
"Chalk Farm" : 2,
"Chancery Lane" : 1,
"Charing Cross" : 1,
"Chiswick Park" : 3,
"Clapham Common" : 2,
"Clapham North" : 2,
"Clapham South" : 3,
"Colliers Wood" : 3,
"Covent Garden" : 1,
"Crossharbour" : 2,
"Custom House" : 3,
"Cutty Sark" : 3,
"Cyprus" : 3,
"Deptford Bridge" : 3,
"Devons Road" : 2,
"Dollis Hill" : 3,
"Ealing Broadway" : 3,
"Ealing Common" : 3,
"Earl's Court" : 2,
"East Acton" : 2,
"East Finchley" : 3,
"East India" : 3,
"East Putney" : 3,
"Edgware Road" : 1,
"Elephant & Castle" : 1,
"Elverson Road" : 3,
"Embankment" : 1,
"Euston" : 1,
"Euston Square" : 1,
"Farringdon" : 1,
"Finchley Road" : 2,
"Finsbury Park" : 2,
"Fulham Broadway" : 2,
"Gallions Reach" : 3,
"Gloucester Road" : 1,
"Golders Green" : 3,
"Goldhawk Road" : 2,
"Goodge Street" : 1,
"Great Portland Street" : 1,
"Green Park" : 1,
"Greenwich" : 3,
"Gunnersbury" : 3,
"Hammersmith" : 2,
"Hampstead" : 3,
"Hanger Lane" : 3,
"Harlesden" : 3,
"Heron Quays" : 2,
"High Street Kensington" : 1,
"Highbury & Islington" : 2,
"Highgate" : 3,
"Holborn" : 1,
"Holland Park" : 2,
"Holloway Road" : 2,
"Hyde Park Corner" : 1,
"Island Gardens" : 2,
"Kennington" : 2,
"Kensal Green" : 2,
"Kensington (Olympia)" : 2,
"Kentish Town" : 2,
"Kilburn" : 2,
"Kilburn Park" : 2,
"King's Cross St. Pancras" : 1,
"Knightsbridge" : 1,
"Ladbroke Grove" : 2,
"Lambeth North" : 1,
"Lancaster Gate" : 1,
"Latimer Road" : 2,
"Leicester Square" : 1,
"Lewisham" : 3,
"Leyton" : 3,
"Limehouse" : 2,
"Liverpool Street" : 1,
"London Bridge" : 1,
"Maida Vale" : 2,
"Manor House" : 3,
"Mansion House" : 1,
"Marble Arch" : 1,
"Marylebone" : 1,
"Mile End" : 2,
"Monument" : 1, 
"Moorgate" : 1,
"Mornington Crescent" : 2,
"Mudchute" : 2,
"Neasden" : 3,
"North Acton" : 3,
"North Ealing" : 3,
"North Greenwich" : 3,
"Northfields" : 3,
"Notting Hill Gate" : 2,
"Old Street" : 1,
"Oval" : 2,
"Oxford Circus" : 1,
"Paddington" : 1,
"Park Royal" : 3,
"Parsons Green" : 2,
"Picadilly Circus" : 1,
"Pimlico" : 1,
"Plaistow" : 3,
"Poplar" : 2,
"Prince Regent" : 3,
"Pudding Mill Lane" : 3,
"Putney Bridge" : 2,
"Queen's Park" : 2,
"Queensway" : 1,
"Ravenscourt Park" : 2,
"Regent's Park" : 1,
"Royal Albert": 3,
"Royal Oak" : 2,
"Royal Victoria" : 3,
"Russell Square" : 1,
"Seven Sisters" : 3,
"Shadwell" : 2,
"Shepherd's Bush" : 2,
"Sloane Square" : 1,
"South Ealing" : 3,
"South Kensington" : 1,
"South Quay" : 2,
"Southfields" : 3,
"Southwark" : 1,
"St. James's Park" : 1,
"St. John's Wood" : 2,
"St. Paul's" : 1,
"Stamford Brook" : 2,
"Stepney Green" : 2,
"Stockwell" : 2,
"Stonebridge Park" : 3,
"Stratford" : 3,
"Swiss Cottage" : 2,
"Temple" : 1,
"Tooting Bec" : 3,
"Tooting Broadway" : 3,
"Tottenham Court Road" : 1,
"Tottenham Hale" : 3,
"Tower Gateway" : 1,
"Tower Hill" : 1,
"Tufnell Park" : 2,
"Turnham Green" : 3,
"Turnpike Lane" : 3,
"Upton Park" : 3,
"Vauxhall" : 2,
"Victoria" : 1,
"Walthamstow Central" : 3,
"Warren Street" : 1,
"Warwick Avenue" : 2,
"Waterloo" : 1,
"West Acton" : 3,
"West Brompton" : 2,
"West Ham" : 3,
"West Hampstead" : 2,
"West India Quay" : 2,
"West Kensington" : 2,
"Westbourne Park" : 2,
"Westferry" : 2,
"Westminster" : 1,
"White City" : 2,
"Whitechapel" : 2,
"Willesden Green" : 3,
"Willesden Junction" : 3,
"Wimbledon" : 3,
"Wimbledon Park" : 3,
"Wood Green" : 3,
"Wood Lane": 2,
"Battersea Power Station": 1,
"Nine Elms" : 1,
"Abbey Road" : 3,
"Star Lane" : 3,
"Stratford High Street" : 3,
"Stratford International" : 3,
"Langdon Park" : 2,
"King George V" : 3,
"London City Airport" : 3,
"Pontoon Dock" : 3,
"West Silvertown" : 3,
"Shepherd's Bush Market": 2,
"West Ealing": 3,
"Acton Main Line": 3,
"Forest Gate": 3,
"Maryland": 3
};

const tubeLines = {"Acton Town" : ["D","P"],
"Aldgate": ["M","Ci"],
"Aldgate East" : ["H", "D"],
"All Saints" : ["DLR"],
"Angel" : ["N"],
"Archway" : ["N"],
"Arsenal" : ["P"],
"Baker Street" : ["M", "B", "Ci", "J","H"],
"Balham" : ["N"],
"Bank" : ["W","N", "Ce", "DLR"],
"Barbican" : ["M", "Ci"],
"Barons Court" : ["D","P"],
"Bayswater" : ["D", "Ci"],
"Beckton" : ["DLR"],
"Beckton Park" : ["DLR"],
"Belsize Park" : ["N"],
"Bermondsey" : ["J"],
"Bethnal Green" : ["Ce"],
"Blackfriars" : ["D", "Ci"],
"Blackhorse Road" : ["V"],
"Blackwall" : ["DLR"],
"Bond Street" : ["Ce", "J", "E"],
"Borough" : ["N"],
"Bow Church" : ["DLR"],
"Bow Road" : ["D", "H"],
"Brent Cross" : ["N"],
"Brixton" : ["V"],
"Bromley-By-Bow" : ["D", "H"],
"Caledonian Road" : ["P"],
"Camden Town" : ["N"],
"Canada Water" : ["J"],
"Canary Wharf" : ["J", "DLR", "E"],
"Canning Town" : ["J", "DLR"],
"Cannon Street" : ["D", "Ci"],
"Chalk Farm" : ["N"],
"Chancery Lane" : ["Ce"],
"Charing Cross" : ["B", "N"],
"Chiswick Park" : ["D"],
"Clapham Common" : ["N"],
"Clapham North" : ["N"],
"Clapham South" : ["N"],
"Colliers Wood" : ["N"],
"Covent Garden" : ["P"],
"Crossharbour" : ["J", "DLR"],
"Custom House" : ["DLR", "E"],
"Cutty Sark" : ["DLR"],
"Cyprus" : ["DLR"],
"Deptford Bridge" : ["DLR"],
"Devons Road" : ["DLR"],
"Dollis Hill" : ["J"],
"Ealing Broadway" : ["D","C", "E"],
"Ealing Common" : ["D","P"],
"Earl's Court" : ["D","P"],
"East Acton" : ["C"],
"East Finchley" : ["N"],
"East India" : ["DLR"],
"East Putney" : ["D"],
"Edgware Road" : ["B", "H", "D", "Ci"],
"Elephant & Castle" : ["N", "B"],
"Elverson Road" : ["DLR"],
"Embankment" : ["D", "B", "N", "Ci"],
"Euston" : ["N", "V"],
"Euston Square" : ["M", "Ci", "H"],
"Farringdon" : ["M", "Ci", "H", "E"],
"Finchley Road" : ["M", "J"],
"Finsbury Park" : ["P", "V"],
"Fulham Broadway" : ["D"],
"Gallions Reach" : ["DLR"],
"Gloucester Road" : ["D", "Ci", "P"],
"Golders Green" : ["N"],
"Goldhawk Road" : ["H", "Ci"],
"Goodge Street" : ["N"],
"Great Portland Street" : ["M", "Ci", "H"],
"Green Park" : ["P", "V", "J"],
"Greenwich" : ["DLR"],
"Gunnersbury" : ["D"],
"Hammersmith" : ["D", "P", "H", "Ci"],
"Hampstead" : ["N"],
"Hanger Lane" : ["N"],
"Harlesden" : ["B"],
"Heron Quays" : ["DLR"],
"High Street Kensington" : ["D", "Ci"],
"Highbury & Islington" : ["V"],
"Highgate" : ["N"],
"Holborn" : ["Ce", "P"],
"Holland Park" : ["Ce"],
"Holloway Road" : ["P"],
"Hyde Park Corner" : ["P"],
"Island Gardens" : ["DLR"],
"Kennington" : ["N"],
"Kensal Green" : ["B"],
"Kensington (Olympia)" : ["D"],
"Kentish Town" : ["N"],
"Kilburn" : ["J"],
"Kilburn Park" : ["B"],
"King's Cross St. Pancras" : ["M", "N", "P", "Ci", "V", "H"],
"Knightsbridge" : ["P"],
"Ladbroke Grove" : ["H&C", "C"],
"Lambeth North" : ["B"],
"Lancaster Gate" : ["C"],
"Latimer Road" : ["H", "Ci"],
"Leicester Square" : ["P", "N"],
"Lewisham" : ["DLR"],
"Leyton" : ["C"],
"Limehouse" : ["DLR"],
"Liverpool Street" : ["M", "Ce", "Ci", "H", "E"],
"London Bridge" : ["N", "J"],
"Maida Vale" : ["B"],
"Manor House" : ["P"],
"Mansion House" : ["D", "C"],
"Marble Arch" : ["C"],
"Marylebone" : ["B"],
"Mile End" : ["D", "H", "Ce"],
"Monument" : ["D", "C"], 
"Moorgate" : ["M", "N", "Ci", "H"],
"Mornington Crescent" : ["N"],
"Mudchute" : ["DLR"],
"Neasden" : ["J"],
"North Acton" : ["C"],
"North Ealing" : ["P"],
"North Greenwich" : ["J"],
"Northfields" : ["P"],
"Notting Hill Gate" : ["D", "Ce", "Ci"],
"Old Street" : ["N"],
"Oval" : ["N"],
"Oxford Circus" : ["Ce", "B", "V"],
"Paddington" : ["H", "D", "Ci", "B", "E"],
"Park Royal" : ["P"],
"Parsons Green" : ["D"],
"Picadilly Circus" : ["B", "P"],
"Pimlico" : ["V"],
"Plaistow" : ["D", "H"],
"Poplar" : ["DLR"],
"Prince Regent" : ["DLR"],
"Pudding Mill Lane" : ["DLR"],
"Putney Bridge" : ["D"],
"Queen's Park" : ["B"],
"Queensway" : ["C"],
"Ravenscourt Park" : ["D"],
"Regent's Park" : ["B"],
"Royal Albert": ["DLR"],
"Royal Oak" : ["H", "Ci"],
"Royal Victoria" : ["DLR"],
"Russell Square" : ["P"],
"Seven Sisters" : ["V"],
"Shadwell" : ["DLR"],
"Shepherd's Bush" : ["Ce"],
"Shepherd's Bush Market": ["H", "Ci"],
"Sloane Square" : ["D", "Ci"],
"South Ealing" : ["P"],
"South Kensington" : ["D", "P", "Ci"],
"South Quay" : ["DLR"],
"Southfields" : ["D"],
"Southwark" : ["J"],
"St. James's Park" : ["D", "Ci"],
"St. John's Wood" : ["J"],
"St. Paul's" : ["C"],
"Stamford Brook" : ["D"],
"Stepney Green" : ["D", "H"],
"Stockwell" : ["N", "V"],
"Stonebridge Park" : ["B"],
"Stratford" : ["DLR", "Ce", "J"],
"Swiss Cottage" : ["J"],
"Temple" : ["D", "Ci"],
"Tooting Bec" : ["N"],
"Tooting Broadway" : ["N"],
"Tottenham Court Road" : ["C", "N", "E"],
"Tottenham Hale" : ["V"],
"Tower Gateway" : ["DLR"],
"Tower Hill" : ["D", "Ci"],
"Tufnell Park" : ["N"],
"Turnham Green" : ["D", "P"],
"Turnpike Lane" : ["P"],
"Upton Park" : ["D", "H"],
"Vauxhall" : ["V"],
"Victoria" : ["D", "Ci", "V"],
"Walthamstow Central" : ["V"],
"Warren Street" : ["N"],
"Warwick Avenue" : ["B"],
"Waterloo" : ["W", "B", "N", "J"],
"West Acton" : ["C"],
"West Brompton" : ["D"],
"West Ham" : ["DLR", "D", "H", "J"],
"West Hampstead" : ["J"],
"West India Quay" : ["DLR"],
"West Kensington" : ["D"],
"Westbourne Park" : ["H", "Ci"],
"Westferry" : ["DLR"],
"Westminster" : ["D", "Ci", "J"],
"White City" : ["C"],
"Whitechapel" : ["D", "H", "E"],
"Willesden Green" : ["J"],
"Willesden Junction" : ["B"],
"Wimbledon" : ["D"],
"Wimbledon Park" : ["D"],
"Wood Green" : ["P"],
"Wood Lane": ["H", "Ci"],
"Battersea Power Station": ["N"],
"Nine Elms" : ["N"],
"Abbey Road" : ["DLR"],
"Star Lane" : ["DLR"],
"Stratford High Street" : ["DLR"],
"Stratford International" : ["DLR"],
"Langdon Park" : ["DLR"],
"King George V" : ["DLR"],
"London City Airport" : ["DLR"],
"Pontoon Dock" : ["DLR"],
"West Silvertown" : ["DLR"],
"West Ealing": ["E"],
"Acton Main Line": ["E"],
"Forest Gate": ["E"],
"Maryland": ["E"]
};
