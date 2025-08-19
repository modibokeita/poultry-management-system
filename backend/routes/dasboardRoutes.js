import express from 'express'
import { Addeggs, geteggs } from '../controllers/eggsController.js'
import { getDashboard } from '../controllers/dashboardController.js'
import { addRecord, getRecord } from '../controllers/recordsContorller.js'
import { addFinance, getFinance } from '../controllers/financeController.js'
import { getInventory, addInventory } from '../controllers/inventoryController.js'
import { addAnimalsType, addAnimals, getAnimals, getDailyRecords,getAnimalTypes } from '../controllers/animalsController.js'
export const dashboardRouter = express.Router()

dashboardRouter.post('/eggs', Addeggs)
dashboardRouter.get('/eggs', geteggs)
dashboardRouter.get('/records', getRecord)
dashboardRouter.post('/records', addRecord)
dashboardRouter.get('/dashboard', getDashboard)
dashboardRouter.post('/finance', addFinance)
dashboardRouter.get('/finance', getFinance)
dashboardRouter.post('/inventory', addInventory)
dashboardRouter.get('/inventory', getInventory)
dashboardRouter.post('/animal-types', addAnimalsType)
dashboardRouter.post('/animals', addAnimals)
dashboardRouter.get('/animals', getAnimals)
dashboardRouter.get('/animal-types', getAnimalTypes)
dashboardRouter.get('/daily-records', getDailyRecords)