const { CallTracker } = require('assert')
const axios = require('axios')

let paging = new Array()

//controller
const flickr = async (req, res) => {
    try{
        //paging
        if(req.query.page){
            if(!paging[req.query.page]){
                let data = await getDataFlickr(req.query.id, req.query.ids, req.query.tags, req.query.tagmode, req.query.lang)
                paging[req.query.page] = data
            }
            let response = {
                status : 'success',
                message : 'Berhasil mengambil data!',
                page : req.query.page,
            }
            Object.assign(response, {
                data : paging[req.query.page],
            })
            return res.status(200).json(response)
        }

        let data = await getDataFlickr(req.query.id, req.query.ids, req.query.tags, req.query.tagmode, req.query.lang)
        //reset paging
        paging = new Array()
        paging[1] = data
        if(!data){
            return res.status(400).json({
                status : 'error',
                message : 'Gagal mengambil data!',
            })
        }
        return res.status(200).json({
                status : 'success',
                message : 'Berhasil mengambil data!',
                data : data,
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


module.exports = {
    flickr,
}