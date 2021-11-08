const express = require('express')
const router = express.Router()
const fs = require('fs')
//INDEX ROUTE
router.get('/', (req, res) =>{
    let dinosaurs = fs.readFileSync('./dinosaur.json')
    let dinoData = JSON.parse(dinosaurs)
    let nameFilter = req.query.nameFilter

    if(nameFilter) {
        dinoData = dinoData.filter((dino)=>{
            return dino.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }

    res.render('dinosaurs/index.ejs', {dinoData: dinoData})
})
//NEW ROUTE
router.get('/new', (req, res)=>{
    res.render('dinosaurs/new.ejs')
})
//GET UPDATE FROM
router.get('/edit/:idx', (req, res)=> {
    let dinosaurs = fs.readFileSync('./dinosaur.json')
    let dinoData = JSON.parse(dinosaurs)

    res.render('dinosaurs/edit.ejs', {dinoId: req.params.idx, dino: dinoData[req.params.idx]})
})

//PUT ROUTE
router.put('/:idx', (req, res)=> {
    let dinosaurs = fs.readFileSync('./dinosaur.json')
    let dinoData = JSON.parse(dinosaurs)
    dinoData[req.params.idx].name = req.body.name
    dinoData[req.params.idx].type = req.body.type

    fs.writeFileSync('./dinosaur.json', JSON.stringify(dinoData))
    res.redirect('/dinosaurs')
})
//SHOW ROUTE
router.get('/:idx', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaur.json')
    let dinoData = JSON.parse(dinosaurs)

    //get array index from url parameter
    let dinoIndex = req.params.idx
    console.log(dinoData[dinoIndex])

    res.render('dinosaurs/show.ejs', {myDino: dinoData[dinoIndex]})
})
//POST A NEW DINO
router.post('/', (req, res)=>{
    //get dino array
    let dinosaurs = fs.readFileSync('./dinosaur.json')
    let dinoData = JSON.parse(dinosaurs)

    //add new dino to dino data
    dinoData.push(req.body)

    //save updated dino data to json
    fs.writeFileSync('./dinosaur.json', JSON.stringify(dinoData))

    //redirect to GET /dinosaur (index)
    res.redirect('/dinosaurs')
})

router.delete('/:idx',(req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaur.json')
    let dinoData = JSON.parse(dinosaurs)

    //remove the deleted dinosaur from the dino array
    dinoData.splice(req.params.idx, 1)
    //save new dinos to json file
    fs.writeFileSync('./dinosaur.json', JSON.stringify(dinoData))

    res.redirect('/dinosaurs')
})


module.exports = router