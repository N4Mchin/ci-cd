const express = require('express');
const bodyParser = require('body-parser');
const Report = require('../models/ServiceRequest');

const router = new express.Router();
router.use(bodyParser.json());

// read all report list
const readReportList = async (req, res) => {
    return Report
        .find({})
        .then(results => {
            console.log(results)

            if (typeof results !== undefined) {
                return res.status(200).json({
                    success: true,
                    data: results,
                })
            }

            return res.status(404)
        })
}

// handle showing filtered report list
const filteredReportList = async (filter, res) => {
    // console.log(filter) //-checked successfully on there

    return Report
        .find({})
        .then(results => {
            if (typeof results !== undefined) {
                var finalResult = []

                // set temp final result
                for (var it in results) {
                    // console.log(results[it]) //- checked here successfully
                    // 1. date range
                    if (typeof filter.dateRange !== 'undefined') {
                        switch(filter.dateRange) {
                            case 'today': {
                                let createdDate = new Date(results[it].createdAt).toLocaleString('en-GB', { timezone: 'Asia/Ulaanbaatar ' })
                                let currentDate = new Date().toLocaleString('en-GB', { timezone: 'Asia/Ulaanbaatar ' })

                                let dateCreated = createdDate.split("/")
                                let dateNow = currentDate.split("/")
                                if (dateCreated[1] === dateNow[1]) {    
                                    finalResult.push(results[it])
                                    // console.log("1")
                                }

                                break
                            }

                            case 'oneWeek': {
                                let createdDate = new Date(results[it].createdAt)
                                let currentDate = new Date()

                                let oneWeek = (((1000*60)*60)*24)*7

                                if (currentDate.getTime() - createdDate.getTime() <= oneWeek) {
                                    finalResult.push(results[it])
                                    // console.log("2")
                                }

                                break
                            }

                            case 'twoWeek': {
                                let createdDate = new Date(results[it].createdAt)
                                let currentDate = new Date()

                                let twoWeek = (((1000*60)*60)*24)*14

                                if (currentDate.getTime() - createdDate.getTime() <= twoWeek) {
                                    finalResult.push(results[it])
                                    // console.log("3")
                                }

                                break
                            }

                            case 'threeWeek': {
                                let createdDate = new Date(results[it].createdAt)
                                let currentDate = new Date()

                                let threeWeek = (((1000*60)*60)*24)*21

                                if (currentDate.getTime() - createdDate.getTime() <= threeWeek) {
                                    finalResult.push(results[it])
                                    // console.log("4")
                                }

                                break
                            }

                            case 'thisMonth': {
                                let createdDate = new Date(results[it].createdAt).toLocaleString('en-GB', { timezone: 'Asia/Ulaanbaatar ' })
                                let currentDate = new Date().toLocaleString('en-GB', { timezone: 'Asia/Ulaanbaatar ' })

                                let dateCreated = createdDate.split("/")
                                let dateNow = currentDate.split("/")

                                if (dateCreated[0] === dateNow[0]) {
                                    finalResult.push(results[it])
                                    // console.log("5")
                                }

                                break
                            }

                            case 'all': {
                                finalResult.push(results[it])
                                // console.log("6")

                                break
                            }
                        }
                    }
                }
                
                // console.log(finalResult) // checking final result is here
                console.log(filter) // checking filter

                // filter one by one
                for (var it1 in finalResult) {
                    if (typeof filter.serviceType !== 'undefined')
                        for (var it2 in filter.serviceType) {
                            switch (filter.serviceType[it2]) {
                                case 'Эмчийн үзлэг': {
                                    console.log('orloo1')
                                    if (finalResult[it1].checkupCost === 0) {
                                        finalResult.splice(it1, 1)
                                    }

                                    break
                                }

                                case 'Лабораторийн шинжилгээ': {
                                    console.log('orloo2')
                                    if (finalResult[it1].labTestCost === 0) {
                                        finalResult.splice(it1, 1)
                                    }

                                    break
                                }

                                case 'Багажийн шинжилгээ': {
                                    console.log('orloo3', filter.serviceType[it2])
                                    if (finalResult[it1].diagnosticTestCost === 0) {
                                        finalResult.splice(it1, 1)
                                    }

                                    break
                                }

                                case 'Багц үйлчилгээ': {
                                }
                            }
                        }

                    if (typeof filter.discountType !== 'undefined')
                        for (var it2 in filter.discountType) {
                            switch (filter.discountType[it2]) {
                                case 'Байнгын үйлчлүүлэгч': {
                                    var checker = true;
                                    if (typeof finalResult[it1].customersDiscount !== 'undefined')
                                        for (var it3 in finalResult[it1].customersDiscount)
                                            if (finalResult[it1].customersDiscount[it3] === 'Байнгын') {
                                                checker = false
                                                break
                                            }
                                
                                    if (checker) 
                                        finalResult.splice(it1, 1)
                                        
                                    break
                                }

                                case 'Хяналтын үйлчлүүлэгч': {
                                    var checker = true;
                                    if (typeof finalResult[it1].customersDiscount !== 'undefined')
                                        for (var it3 in finalResult[it1].customersDiscount)
                                            if (finalResult[it1].customersDiscount[it3] === 'Хяналтын') {
                                                checker = false
                                                break
                                            }
                                
                                    if (checker) 
                                        finalResult.splice(it1, 1)
                                        
                                    break
                                }

                                case 'Бэлгийн карт': {
                                    var checker = true;
                                    if (typeof finalResult[it1].customersDiscount !== 'undefined')
                                        for (var it3 in finalResult[it1].customersDiscount)
                                            if (finalResult[it1].customersDiscount[it3] === 'Бэлгийн карт') {
                                                checker = false
                                                break
                                            }
                                
                                    if (checker) 
                                        finalResult.splice(it1, 1)
                                        
                                    break
                                }
                                // TODO: Эрхийн бичиг
                                case 'Эрхийн бичиг': {
                                }
                            }
                        }
                
                    if (typeof filter.localBill !== 'undefined')
                        for (var it2 in filter.localBill) {
                            switch (filter.localBill[it2]) {
                                case 'Гэгээн булаг': {
                                    var checker = true;
                                    if (typeof finalResult[it1].relatedCompanyBills !== 'undefined')
                                        for (var it3 in finalResult[it1].relatedCompanyBills)
                                            if (finalResult[it1].relatedCompanyBills[it3] === 'Гэгээн булаг') {
                                                checker = false
                                                break
                                            }
                                
                                    if (checker) 
                                        finalResult.splice(it1, 1)
                                        
                                    break
                                }

                                case 'Нинж ачлал': {
                                    var checker = true;
                                    if (typeof finalResult[it1].relatedCompanyBills !== 'undefined')
                                        for (var it3 in finalResult[it1].relatedCompanyBills)
                                            if (finalResult[it1].relatedCompanyBills[it3] === 'Нинж ачлал') {
                                                checker = false
                                                break
                                            }
                                
                                    if (checker) 
                                        finalResult.splice(it1, 1)
                                        
                                    break
                                }

                                case 'Гал харнууд': {
                                    var checker = true;
                                    if (typeof finalResult[it1].relatedCompanyBills !== 'undefined')
                                        for (var it3 in finalResult[it1].relatedCompanyBills)
                                            if (finalResult[it1].relatedCompanyBills[it3] === 'Гал харнууд') {
                                                checker = false
                                                break
                                            }
                                
                                    if (checker) 
                                        finalResult.splice(it1, 1)
                                        
                                    break
                                }

                                case 'Сутайн Гурван хулд': {
                                    var checker = true;
                                    if (typeof finalResult[it1].relatedCompanyBills !== 'undefined')
                                        for (var it3 in finalResult[it1].relatedCompanyBills)
                                            if (finalResult[it1].relatedCompanyBills[it3] === 'Сутайн гурван хулд') {
                                                checker = false
                                                break
                                            }
                                
                                    if (checker) 
                                        finalResult.splice(it1, 1)
                                        
                                    break
                                }

                                case 'Оном сан': {
                                    var checker = true;
                                    if (typeof finalResult[it1].relatedCompanyBills !== 'undefined')
                                        for (var it3 in finalResult[it1].relatedCompanyBills)
                                            if (finalResult[it1].relatedCompanyBills[it3] === 'Оном сан') {
                                                checker = false
                                                break
                                            }
                                
                                    if (checker) 
                                        finalResult.splice(it1, 1)
                                        
                                    break
                                }

                                case 'Оном сургууль': {
                                    var checker = true;
                                    if (typeof finalResult[it1].relatedCompanyBills !== 'undefined')
                                        for (var it3 in finalResult[it1].relatedCompanyBills)
                                            if (finalResult[it1].relatedCompanyBills[it3] === 'Оном сургууль') {
                                                checker = false
                                                break
                                            }
                                
                                    if (checker) 
                                        finalResult.splice(it1, 1)
                                        
                                    break
                                }

                                case 'Добу технологи': {
                                    var checker = true;
                                    if (typeof finalResult[it1].relatedCompanyBills !== 'undefined')
                                        for (var it3 in finalResult[it1].relatedCompanyBills)
                                            if (finalResult[it1].relatedCompanyBills[it3] === 'Добу технологи') {
                                                checker = false
                                                break
                                            }
                                
                                    if (checker) 
                                        finalResult.splice(it1, 1)
                                        
                                    break
                                }
                            }
                        }

                    if (typeof filter.specialDiscountType !== 'undefined') {
                        for (var it2 in filter.specialDiscountType) {
                            // console.log(filter.specialDiscountType[it2]) // hariu irev

                            switch (filter.specialDiscountType[it2]) {
                                case 'Лаборатори': {
                                    var checker = true;

                                    if (typeof finalResult[it1].specialDiscount !== 'undefined')
                                        for (var it3 in finalResult[it1].specialDiscount)
                                            if (finalResult[it1].specialDiscount[it3] === 'Лаборатори') {
                                                checker = false
                                                break
                                            }
                                
                                    if (checker) 
                                        finalResult.splice(it1, 1)
                                        
                                    break
                                }

                                case 'Багаж': {
                                    var checker = true;

                                    if (typeof finalResult[it1].specialDiscount !== 'undefined')
                                        for (var it3 in finalResult[it1].specialDiscount)
                                            if (finalResult[it1].specialDiscount[it3] === 'Багаж') {
                                                checker = false
                                                break
                                            }
                                
                                    if (checker) 
                                        finalResult.splice(it1, 1)
                                        
                                    break
                                }

                                case 'Эмчийн үзлэг': {
                                    // console.log(finalResult[it1].specialDiscount) //hariu irev
                                    var checker = true;

                                    if (typeof finalResult[it1].specialDiscount !== 'undefined')
                                        for (var it3 in finalResult[it1].specialDiscount)
                                            if (finalResult[it1].specialDiscount[it3] === 'Эмчийн үзлэг') {
                                                checker = false
                                                break
                                            }
                                
                                    if (checker) 
                                        finalResult.splice(it1, 1)
                                        
                                    break
                                }
                            }
                        }
                    }

                    if (typeof filter.researchPurpose !== 'undefined')
                        for (var it2 in filter.researchPurpose) {
                            switch (filter.researchPurpose[it2]) {
                                case 'DLivr study': {
                                    var checker = true;

                                    if (typeof finalResult[it1].research !== 'undefined')
                                        for (var it3 in finalResult[it1].research)
                                            if (finalResult[it1].research[it3] === 'DLivr study') {
                                                checker = false
                                                break
                                            }
                                
                                    if (checker) 
                                        finalResult.splice(it1, 1)
                                        
                                    break
                                }

                                case 'Non hodgkin lymphoma': {
                                    var checker = true;

                                    if (typeof finalResult[it1].research !== 'undefined')
                                        for (var it3 in finalResult[it1].research)
                                            if (finalResult[it1].research[it3] === 'Non hodgkin lymphoma') {
                                                checker = false
                                                break
                                            }
                                
                                    if (checker) 
                                        finalResult.splice(it1, 1)
                                        
                                    break
                                }

                                case 'IL28-B': {
                                    var checker = true;

                                    if (typeof finalResult[it1].research !== 'undefined')
                                        for (var it3 in finalResult[it1].research)
                                            if (finalResult[it1].research[it3] === 'IL28-B') {
                                                checker = false
                                                break
                                            }
                                
                                    if (checker) 
                                        finalResult.splice(it1, 1)
                                        
                                    break
                                }

                                case 'Vertical Transmission': {
                                    var checker = true;

                                    if (typeof finalResult[it1].research !== 'undefined')
                                        for (var it3 in finalResult[it1].research)
                                            if (finalResult[it1].research[it3] === 'Vertical Transmission') {
                                                checker = false
                                                break
                                            }
                                
                                    if (checker) 
                                        finalResult.splice(it1, 1)
                                        
                                    break
                                }

                                case 'Rapid Test specific': {
                                    var checker = true;

                                    if (typeof finalResult[it1].research !== 'undefined')
                                        for (var it3 in finalResult[it1].research)
                                            if (finalResult[it1].research[it3] === 'Rapid Test specific') {
                                                checker = false
                                                break
                                            }
                                
                                    if (checker) 
                                        finalResult.splice(it1, 1)
                                        
                                    break
                                }

                                case 'Hepatitis D sexual trans': {
                                    var checker = true;

                                    if (typeof finalResult[it1].research !== 'undefined')
                                        for (var it3 in finalResult[it1].research)
                                            if (finalResult[it1].research[it3] === 'Hepatitis D sexual trans') {
                                                checker = false
                                                break
                                            }
                                
                                    if (checker) 
                                        finalResult.splice(it1, 1)
                                        
                                    break
                                }
                            }
                        }

                    if (typeof filter.paymentMethod !== 'undefined')
                        for (var it2 in filter.paymentMethod) {
                            switch (filter.paymentMethod[it2]) {
                                case 'Бэлэн мөнгөөр': {
                                    if (parseInt(finalResult[it1].InCash) === 0) {
                                        finalResult.splice(it1, 1)
                                    }

                                    break
                                }

                                case 'Бэлэн бус, банкны картаар': {
                                    if (parseInt(finalResult[it1].ByCredit) === 0) {
                                        finalResult.splice(it1, 1)
                                    }

                                    break
                                }
                            }
                        }

                    if (typeof filter.discountWorker !== 'undefined')
                        for (var it2 in filter.discountWorker) {
                            switch (filter.discountWorker[it2]) {
                                case 'Ажилтны гэр бүл 30%': {
                                    var checker = true;

                                    if (typeof finalResult[it1].staffsDiscount !== 'undefined')
                                        for (var it3 in finalResult[it1].staffsDiscount)
                                            if (finalResult[it1].staffsDiscount[it3] === 'Ажилтны гэр бүл 30%') {
                                                checker = false
                                                break
                                            }
                                
                                    if (checker) 
                                        finalResult.splice(it1, 1)
                                        
                                    break
                                }

                                case 'Элэгний асуудалтай ажилтан': {
                                    var checker = true;

                                    if (typeof finalResult[it1].staffsDiscount !== 'undefined')
                                        for (var it3 in finalResult[it1].staffsDiscount)
                                            if (finalResult[it1].staffsDiscount[it3] === 'Элэгний асуудалтай ажилтан') {
                                                checker = false
                                                break
                                            }
                                
                                    if (checker) 
                                        finalResult.splice(it1, 1)
                                        
                                    break
                                }

                                case 'Урьдчилан сэргийлэх үзлэг': {
                                    var checker = true;

                                    if (typeof finalResult[it1].staffsDiscount !== 'undefined')
                                        for (var it3 in finalResult[it1].staffsDiscount)
                                            if (finalResult[it1].staffsDiscount[it3] === 'Урьдчилан сэргийлэх үзлэг') {
                                                checker = false
                                                break
                                            }
                                
                                    if (checker) 
                                        finalResult.splice(it1, 1)
                                        
                                    break
                                }
                            }
                        }

                    if (typeof filter.registeredReception !== 'undefined')
                        for (var it2 in filter.registeredReception) {
                            switch (filter.registeredReception[it2]) {
                                case 'Д. ЗОЛЗАЯА': {
                                    
                                }

                                case 'М. МӨНХЗАЯА': {
                                    
                                }
                            }
                        }
                }

                //console.log(finalResult)

                return res.status(200).json({
                    success: true,
                    data: finalResult,
                })
            }

            return res.status(404)
        })
}

// GET: read report data list
router.get('/report', (req, res) => {
    return readReportList(req, res);
});

// POST: read filtered data list
router.post('/report', (req, res) => {
    const filter = req.body

    return filteredReportList(filter, res);
});

module.exports = router;