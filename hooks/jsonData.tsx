import {useState} from "react";

type fileType = object[] | object

export function useJsonData() {
    const [jsonData, setJsonData] = useState<fileType>([
        {
            "name": "Madame Uppercut",
            "age": 39,
            "secretIdentity": "Jane Wilson",
            "powers": [
                "Million tonne punch",
                "Damage resistance",
                "Superhuman reflexes"
            ],
            "data": {
                "squadName": "Super hero squad",
                "homeTown": "Metro City",
                "formed": 2016,
                "secretBase": "Super tower",
                "active": false,
                "data2": {
                    "squadName": "Super hero squad",
                    "homeTown": "Metro City",
                    "formed": 2016,
                    "secretBase": "Super tower",
                    "active": true
                }
            }
        },
        {
            "name": "Molecule Man",
            "age": 29,
            "secretIdentity": "Dan Jokes",
            "powers": [
                "Radiation resistance",
                "Turning tiny",
                "Radiation blast"
            ]
        }])
    const saveJson = function (jsonOld: fileType) {
        setJsonData(jsonOld)
        console.log('saveJson', jsonOld)
    }
    return {jsonData, saveJson}
}