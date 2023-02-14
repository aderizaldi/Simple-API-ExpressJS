const axios = require('axios')

let dataFlickr = {}
let tags = undefined
//controller
const flickr = async (req, res) => {
    try{
        if(req.query.page){
            if(!dataFlickr.items || tags != req.query.tags){
                let data = await getDataFlickr(req.query.id, req.query.ids, req.query.tags, req.query.tagmode, req.query.lang)
                if(!data){
                    return res.status(400).json({
                        status : 'error',
                        message : 'Data tidak ditemukan!',
                    })
                }
                dataFlickr = data
                tags = req.query.tags
            }
            return res.status(200).json({
                status : 'success',
                message : 'Berhasil mengambil data!',
                data : pagging(req.query.page, req.query.per_page || 4),
            })
        }
        dataFlickr = {}
        let data = await getDataFlickr(req.query.id, req.query.ids, req.query.tags, req.query.tagmode, req.query.lang)
        dataFlickr = data
        tags = req.query.tags
        if(!data){
            return res.status(400).json({
                status : 'error',
                message : 'Data tidak ditemukan!',
            })
        }
        return res.status(200).json({
                status : 'success',
                message : 'Berhasil mengambil data!',
                data : pagging(),
            })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            status : 'error',
            message : 'Gagal mengambil data!',
            errors : err,
        })
    }
}

//function
async function getDataFlickr(id, ids, tags, tagmode, lang) {
  try {
    const response = await axios.get('https://www.flickr.com/services/feeds/photos_public.gne',{
        params: {
            nojsoncallback : 1,
            format : 'json',
            id : id,
            ids : ids,
            tags : tags,
            tagmode : tagmode,
            lang : lang,
        }
    })
    return response.data
  } catch (error) {
    console.log(error);
    return false
  }
}

function pagging(page=1, per_page=4){
    const total_page = Math.ceil(dataFlickr.items.length / per_page)
    const total_data = dataFlickr.items.length
    const start = (page - 1) * per_page
    const end = start + per_page
    if(page > total_page){
        return 'Out of content!'
    }
    let data = {
        title : dataFlickr.title,
        description : dataFlickr.description,
        modified : dataFlickr.modified,
        total_data : total_data,
        page : page,
        per_page : per_page,
        total_page : total_page,
        data : dataFlickr.items.slice(start, end)
    }
    return data
}

module.exports = {
    flickr,
}