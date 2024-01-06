import express from 'express';
import Reports from '../Controller/Reports';
import authenticateUser from '../Middleware/authMiddleware';
import authorizeDoctor from '../Middleware/authorizerMiddleware';

const router = express.Router();
const reportsController = new Reports();




// Create a new report
router.post('/', authenticateUser, Reports.createReport);

// Get all reports
router.get('/', Reports.getAllReports);

// Get a single report
router.get('/:id', authenticateUser, Reports.getReportById);

// Update a report
router.put('/:id', authenticateUser, Reports.updateReport);

// Delete a report
router.delete('/:id', authenticateUser, Reports.deleteReport);


export default router;
