import { supabase } from "../../config/supabase.ts"
import { decode } from 'base64-arraybuffer'
import { generate_uuidv4 } from "../general/uuid.ts"

export async function upload_image(previewImage: string): Promise<string> {
    const imgPath = await upload_image_data(previewImage)
    const imageUrl = await get_image_url(imgPath)
    const imageId = await upload_to_image_table(imageUrl)
    return imageId
}

async function upload_image_data(previewImage: string): Promise<string> {
    const parts = previewImage.split(',')
    console.log(parts[0])
    const imageBase64 = parts[parts.length - 1]
    const { data, error } = await supabase
        .storage
        .from('coffee-images')
        .upload(`public/${generate_uuidv4()}.webp`, decode(imageBase64), {
            cacheControl: '3600',
            upsert: false,
            contentType: 'image/webp'
        })

    if (error) {
        console.error(error)
        return ''
    }
    return data.path
}

async function get_image_url(imgPath: string): Promise<string> {
    const { data } = supabase
        .storage
        .from('coffee-images')
        .getPublicUrl(imgPath)

    if (!data.publicUrl) {
        console.error(data)
        return ''
    }
    return data.publicUrl
}

async function upload_to_image_table(imageUrl: string): Promise<string> {
    const { data, error } = await supabase
        .from('images')
        .insert({
            url: imageUrl,
            storage_vendor: "supabase"
        })
        .select()

    if (error) {
        console.error(error)
        return ''
    }
    return data[0].id
}