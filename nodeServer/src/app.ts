import express from 'express';
import { sqlConfig } from './sqlServerConfig'

import * as sql from 'mssql'

const app = express();
const port = 3000;

interface SigilStatus {
    [index: string]: boolean | number | undefined | string,
    watchTowerReferenceNumber?: number,
    rowNumber?: number,
    columnNumber?: number,
    start?: boolean,
    north?: boolean,
    northeast?: boolean,
    east?: boolean,
    southeast?: boolean,
    south?: boolean,
    southwest?: boolean,
    west?: boolean,
    northwest?: boolean,
    end?: boolean,
    originalTableLetter?: string,
    originalTableIsUpper?: boolean,
    reformedTableLetter?: string,
    reformedTableIsUpper?: boolean,
    governorAlignedTableLetter?: string,
    governorAlignedTableIsUpper?: boolean,
    aethry: number,
    subOrder: number,
    charNumber: number,
}

interface Aethyr {
    aethyrNumber: number,
    schuelerAethyrLocation: string,
    schuelerAethyrDescription: string,
    schuelerAethyrComment: string
}

const generateUpdateSquareCommandText = (status?: SigilStatus): string => {
    
    let sql = `UPDATE Enochian.TWatchTowerLayout SET ` 
        sql += `GovernorSigilNorth = ${status?.north ? 1 : 0}, `
        sql += `GovernorSigilNorthEast = ${status?.northeast ? 1 : 0}, `
        sql += `GovernorSigilEast = ${status?.east ? 1 : 0}, `
        sql += `GovernorSigilSouthEast = ${status?.southeast ? 1 : 0}, `
        sql += `GovernorSigilSouth = ${status?.south ? 1 : 0}, `
        sql += `GovernorSigilSouthWest = ${status?.southwest ? 1 : 0}, `
        sql += `GovernorSigilWest = ${status?.west ? 1 : 0}, `
        sql += `GovernorSigilNorthWest = ${status?.northwest ? 1 : 0}, `
        sql += `GovernorSigilStart = ${status?.start ? 1 : 0}, `
        sql += `GovernorSigilEnd = ${status?.end ? 1 : 0}, `
        sql += `OriginalTableLetter = '${status?.originalTableLetter ?? ''}', `
        sql += `OriginalTableIsUpper = ${status?.originalTableIsUpper ? 1 : 0}, `
        sql += `ReformedTableLetter = '${status?.reformedTableLetter ?? ''}', `
        sql += `ReformedTableIsUpper = ${status?.reformedTableIsUpper ? 1 : 0}, `
        sql += `GovernorAlignedTableLetter = '${status?.governorAlignedTableLetter ?? ''}', `
        sql += `GovernorAlignedTableIsUpper = ${status?.governorAlignedTableIsUpper ? 1 : 0}, `
        sql += `AethyrNumber = ${status?.aethry ?? 0 }, `
        sql += `SubOrder = ${status?.subOrder ?? 0 }, `
        sql += `CharNumber = ${status?.charNumber ?? 0} `
        sql += `WHERE `
        sql += `WatchTowerReferenceNumber = ${status?.watchTowerReferenceNumber} AND `
        sql += `RowNumber = ${status?.rowNumber} AND `
        sql += `ColumnNumber = ${status?.columnNumber}` 

    console.log(sql)
    return sql
}

const enerateUpdateAethyrCommandText = () => {
    let sql = `UPDATE Enochian.TAethyrs SET ` 
        sql += `SchuelerAethryLocation = @aethryLocation, `
        sql += `SchuelerAethyrDescription = @aethryDescription, `
        sql += `SchuelerAethyrComment = @aethryComment `
        sql += `WHERE `
        sql += `AethyrNumber = @aethryNumber`

    console.log(sql)
    return sql
}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.get('/UpdateAethyr', (req, res) => {
    var aethry = JSON.parse(req.query['Aethyr'] as string) as Aethyr
    console.warn(aethry)

    var commandText = enerateUpdateAethyrCommandText()

    sql.connect(sqlConfig, function (err) {
  
          var request = new sql.Request();

          request.input('aethryLocation',sql.VarChar, aethry.schuelerAethyrLocation)
          request.input('aethryDescription',sql.VarChar, aethry.schuelerAethyrDescription)
          request.input('aethryComment',sql.VarChar, aethry.schuelerAethyrComment)
          request.input('aethryNumber',sql.Int, aethry.aethyrNumber)
          
          console.log(`cmd: ${commandText}`)
          
          request.query(commandText, function (err, recordset) {
              
            if (err) console.log(err)
            res.send(recordset?.rowsAffected)
        })

    })
})

app.get('/UpdateSquare', (req, res) => {

    var square = JSON.parse(req.query['Square'] as string) as SigilStatus
    console.warn(square)
    var commandText = generateUpdateSquareCommandText(square)
    
    sql.connect(sqlConfig, function (err) {
  
          var request = new sql.Request();
          console.log(`cmd: ${commandText}`)
          
          request.query(commandText, function (err, recordset) {
              
            if (err) console.log(err)
            res.send(recordset?.rowsAffected)
        })

    })
})

app.get('/TAethyrs', (req, res) => {

    var commandText = 'select * from Enochian.TAethyrs'
    sql.connect(sqlConfig, function (err) {
  
          var request = new sql.Request();
          request.query(commandText, function (err, recordset) {
              
              if (err) console.log(err)
              res.send(recordset?.recordset)
          })
    })
})
//EnochianAethyrExtendedType

app.get('/uv_Aethyrs', (req, res) => {

    var commandText = 'select * from Enochian.uv_Aethyrs'
    sql.connect(sqlConfig, function (err) {
  
          var request = new sql.Request();
          request.query(commandText, function (err, recordset) {
              
              if (err) console.log(err)
              res.send(recordset?.recordset)
          })
    })
})

//uv_AllEntities
app.get('/uv_AllEntities', (req, res) => {

    var commandText = 'select * from Enochian.uv_AllEntities'
    sql.connect(sqlConfig, function (err) {
  
          var request = new sql.Request();
          request.query(commandText, function (err, recordset) {
              
              if (err) console.log(err)
              res.send(recordset?.recordset)
          })
    })
})


app.get('/TAethrysDodecadia', (req, res) => {

    var commandText = 'select * from Enochian.TAethrysDodecadia'
    sql.connect(sqlConfig, function (err) {
  
          var request = new sql.Request();
          request.query(commandText, function (err, recordset) {
              
              if (err) console.log(err)
              res.send(recordset?.recordset)
          })
    })
})

app.get('/TAethyrsSubOrder', (req, res) => {

    var commandText = 'select * from Enochian.TAethyrsSubOrder'
    sql.connect(sqlConfig, function (err) {

            var request = new sql.Request();
            request.query(commandText, function (err, recordset) {
                
                if (err) console.log(err)
                res.send(recordset?.recordset)
            })
    })
})

app.get('/TAlphabet', (req, res) => {

    var commandText = 'select * from Enochian.TAlphabet'
    sql.connect(sqlConfig, function (err) {

            var request = new sql.Request();
            request.query(commandText, function (err, recordset) {
                
                if (err) console.log(err)
                res.send(recordset?.recordset)
            })
    })
})

app.get('/TAlphabet', (req, res) => {

    var commandText = 'select * from Enochian.TAlphabet'
    sql.connect(sqlConfig, function (err) {

            var request = new sql.Request();
            request.query(commandText, function (err, recordset) {
                
                if (err) console.log(err)
                res.send(recordset?.recordset)
            })
    })
})

app.get('/TEnochianKeys', (req, res) => {

    var commandText = 'select * from Enochian.TEnochianKeys'
    sql.connect(sqlConfig, function (err) {
  
          var request = new sql.Request();
          request.query(commandText, function (err, recordset) {
              
              if (err) console.log(err)
              res.send(recordset?.recordset)
          })
    })
})

app.get('/TNameTypeDecode', (req, res) => {

    var commandText = 'select * from Enochian.TNameTypeDecode'
    sql.connect(sqlConfig, function (err) {

            var request = new sql.Request();
            request.query(commandText, function (err, recordset) {
                
                if (err) console.log(err)
                res.send(recordset?.recordset)
            })
    })
})

app.get('/TSubQuadrantSquareColors', (req, res) => {

    var commandText = 'select * from Enochian.TSubQuadrantSquareColors'
    sql.connect(sqlConfig, function (err) {

            var request = new sql.Request();
            request.query(commandText, function (err, recordset) {
                
                if (err) console.log(err)
                res.send(recordset?.recordset)
            })
    })
})

app.get('/TWatchTowerHierarchy', (req, res) => {

    var commandText = 'select * from Enochian.TWatchTowerHierarchy'
    sql.connect(sqlConfig, function (err) {

            var request = new sql.Request();
            request.query(commandText, function (err, recordset) {
                
                if (err) console.log(err)
                res.send(recordset?.recordset)
            })
    })
})

app.get('/TWatchTowerLayout', (req, res) => {

    var commandText = 'select * from Enochian.TWatchTowerLayout'
    sql.connect(sqlConfig, function (err) {
  
          var request = new sql.Request();
          request.query(commandText, function (err, recordset) {
              
              if (err) console.log(err)
              res.send(recordset?.recordset)
          })
    })
})

app.get('/TWatchTowerNameLocator', (req, res) => {

  var commandText = 'select * from Enochian.TWatchTowerNameLocator'
  sql.connect(sqlConfig, function (err) {

        var request = new sql.Request();
        request.query(commandText, function (err, recordset) {
            
            if (err) console.log(err)
            res.send(recordset?.recordset)
        })
    })
})

app.get('/TWatchTowerLayout', (req, res) => {

    var commandText = 'select * from Enochian.TWatchTowerLayout'
    sql.connect(sqlConfig, function (err) {
  
          var request = new sql.Request();
          request.query(commandText, function (err, recordset) {
              
              if (err) console.log(err)
              res.send(recordset?.recordset)
          })
    })
})

app.get('/uv_TableLayoutWAethrys', (req, res) => {

    var commandText = 'select * from Enochian.uv_TableLayoutWAethrys'
    sql.connect(sqlConfig, function (err) {
  
          var request = new sql.Request();
          request.query(commandText, function (err, recordset) {
              
              if (err) console.log(err)
              res.send(recordset?.recordset)
          })
    })
})

app.get('/uv_Aethyrs', (req, res) => {

    var commandText = 'select * from Enochian.uv_Aethyrs'
    sql.connect(sqlConfig, function (err) {
  
          var request = new sql.Request();
          request.query(commandText, function (err, recordset) {
              
              if (err) console.log(err)
              res.send(recordset?.recordset)
          })
    })
})


app.get('/uv_Govenors', (req, res) => {

    var commandText = 'select * from Enochian.uv_Govenors'
    sql.connect(sqlConfig, function (err) {
  
          var request = new sql.Request();
          request.query(commandText, function (err, recordset) {
              
              if (err) console.log(err)
              res.send(recordset?.recordset)
          })
      })
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
})