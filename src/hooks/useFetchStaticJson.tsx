import { useEffect, useState } from "react"

const useFetchStaticJson = <T,>(uri: string) => {

    const [data, setData] = useState<T>([] as T)

    const refresh = () :void => {
        fetch(uri)
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(json => {
            setData(json)
        })
        .catch(function () {
          
        })
    }
    useEffect(()=>{
        refresh()
    },[uri])

    return [data, refresh] as const
}

export default useFetchStaticJson