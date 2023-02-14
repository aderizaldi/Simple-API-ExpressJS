const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('..')

chai.use(chaiHttp)
chai.should()

describe("API", () => {
  describe("GET /", () => {
    it("should show welcome messages", (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.message.should.equal('Welcome!')
          done()
        })
    })
    it("should get data from flickr", (done) => {
      chai.request(app)
        .get('/flickr')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.data.title.should.equal('Uploads from everyone')
          done()
        })
    })
    it("should get data from flickr with tags", (done) => {
      chai.request(app)
        .get('/flickr?tags=nature')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.data.title.should.equal('Recent Uploads tagged nature')
          done()
        })
    })
    it("should get data from flickr another page", (done) => {
      chai.request(app)
        .get('/flickr?tags=nature&page=2')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.data.title.should.equal('Recent Uploads tagged nature')
          done()
        })
    })
  })
})