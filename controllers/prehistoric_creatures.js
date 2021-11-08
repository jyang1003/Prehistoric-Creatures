const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/', (req, res) =>{
    let oldDinos = fs.readFileSync('./prehistoric_creatures.json')
    let oldDinoData = JSON.parse(oldDinos)
    res.render('prehistoric_creatures/oldIndex.ejs', {oldDinoData: oldDinoData})
    console.log('delete')
})
router.get('/new', (req, res)=>{
    res.render('prehistoric_creatures/oldNew.ejs')
})
router.post('/', (req, res)=>{
    //get dino array
    let oldDinos = fs.readFileSync('./prehistoric_creatures.json')
    let oldDinoData = JSON.parse(oldDinos)
    
    //add new dino to dino data
    oldDinoData.push(req.body)
    
    //save updated dino data to json
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(oldDinoData))
    
    //redirect to GET /dinosaur (index)
    res.redirect('/prehistoric_creatures')
})
router.get('/:idx', (req, res)=>{
    let oldDinos = fs.readFileSync('./prehistoric_creatures.json')
    let oldDinoData = JSON.parse(oldDinos)

    //get array index from url parameter
    let oldDinoIndex = req.params.idx
    console.log(oldDinoData[oldDinoIndex])
    res.render('prehistoric_creatures/oldShow.ejs', {dino: oldDinoData[oldDinoIndex]})
})
router.delete('/:idx',(req, res)=>{
    let oldDinos = fs.readFileSync('./prehistoric_creatures.json')
    let oldDinoData = JSON.parse(oldDinos)

    //remove the deleted dinosaur from the dino array
    oldDinoData.splice(req.params.idx, 1)
    //save new dinos to json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(oldDinoData))

    res.redirect('/prehistoric_creatures')
})

module.exports = router