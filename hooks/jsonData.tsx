import {useEffect, useState} from "react";

type fileType = object[] | object

export function useJsonData() {
    const [jsonData, setJsonData] = useState<fileType>(
        [
            {
                "name": "Madame Uppercut",
                "age": 39,
                "secretIdentity": "Jane Wilson",
                "powers-one": [
                    "Million tonne punch",
                    "Damage resistance",
                    "Superhuman reflexes",
                    {
                        "color-main": "red",
                        "color-spare": "blue"
                    },
                    [2016, 2017, 2018, 2019],
                    [
                        {
                            "qwe": "ewq",
                            "asd": "dsa"
                        },
                        {
                            "zxc": "cxz",
                            "rty": "ytr"
                        },
                        {
                            "fgh": "hgf",
                            "vbn": "nbv"
                        }
                    ]
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
                        "cash": null,
                        "mix": [{
                            "age": 49,
                            "secretBase": "Kimi ga Kureta Mono"
                        }, "next", 0, false, null]
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
            }
        ]
    )
    const [jsonDataBuffer, setJsonDataBuffer] = useState<fileType>([])
    const saveJson = async function () {
        const jsonText: string = JSON.stringify(jsonData,
            (key, value) => {
                return value === undefined ? "undefined" : value
            }
        )
        const jsonObj: fileType = JSON.parse(jsonText)
        await setJsonDataBuffer(jsonObj)
    }
    const changeJson = async function (jsonOld: fileType) {
        await setJsonData(jsonOld)
    }
    const cancelChangeJson = async function () {
        const jsonText: string = JSON.stringify(jsonDataBuffer,
            (key, value) => {
                return value === undefined ? "undefined" : value
            }
        )
        const jsonObj: fileType = JSON.parse(jsonText)
        await setJsonData(jsonObj)
    }
    useEffect(() => {
        const jsonText: string = JSON.stringify(jsonData,
            (key, value) => {
                return value === undefined ? "undefined" : value
            }
        )
        const jsonObj: fileType = JSON.parse(jsonText)
        setJsonData(jsonObj)
        setJsonDataBuffer(jsonObj)
    }, [])
    return {jsonData, saveJson, changeJson, cancelChangeJson}
}