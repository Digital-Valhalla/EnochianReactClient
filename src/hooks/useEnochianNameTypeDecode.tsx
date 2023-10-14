import useFetchStaticJson from "./useFetchStaticJson"
import { EnochianNameTypeDecodeType } from "../types/enochianNameTypeDecodeType"

const useEnochianNameTypeDecode = () => {
    const [enochianNameTypeDecode] = useFetchStaticJson<EnochianNameTypeDecodeType[]>("/enochiana/hierarchy/nameTypeDecode.json")

    return enochianNameTypeDecode
}

export default useEnochianNameTypeDecode