import {useEffect, useState} from "react";

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
                    "active": true,
                    "status": undefined,
                    "cash": null,
                    "mix": [{
                        "age": 49,
                        "secretBase": "Kimi ga Kureta Mono"
                        },"next", 0, false, undefined, null ]
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
    const [jsonDataBuffer, setJsonDataBuffer] = useState<fileType>([])
    const saveJson = function () {
        setJsonDataBuffer(jsonData)
    }
    const changeJson = function (jsonOld: fileType){
        setJsonData(jsonOld)
    }
    const cancelChangeJson = function () {
        setJsonData(jsonDataBuffer)
    }
    useEffect(() =>{
        saveJson()
    },[])
    return {jsonData, jsonDataBuffer, saveJson, changeJson, cancelChangeJson}
}