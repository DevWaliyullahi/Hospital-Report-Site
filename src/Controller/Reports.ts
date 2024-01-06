import { Request, Response } from 'express';
import Report from '../Models/Reports';
import { v4 as uuidv4 } from 'uuid';
import { string } from 'zod';

class ReportsController {
  // Get all reports
  static getAllReports = async (req: Request, res: Response) => {
    try {
      const reports = await Report.findAll();
      res.render('report', { title: 'Reports', reports });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

  // Get a single report by ID
  static getReportById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const report = await Report.findByPk(id);
      if (report) {
        res.json(report);
      } else {
        res.status(404).send('Report not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

  // Create a new report
  static createReport = async (req: Request, res: Response) => {
    const {
      patientName,
      email,
      age,
      gender,
      phoneNumber,
      address,
      hospitalName,
      weight,
      height,
      bloodGroup,
      genotypes,
      bloodPressure,
      hiv_status,
      hepatitis_status,
    } = req.body;
    try {
      const newReport = await Report.create({
        patientName,
        email,
        age,
        gender,
        phoneNumber,
        address,
        hospitalName,
        weight,
        height,
        bloodGroup,
        genotypes,
        bloodPressure,
        hiv_status,
        hepatitis_status,
        id: uuidv4(), 
      });
      res.status(201).json(newReport);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

  // Update a report by ID
  static updateReport = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
      patientName,
      email,
      age,
      gender,
      phoneNumber,
      address,
      hospitalName,
      weight,
      height,
      bloodGroup,
      genotypes,
      bloodPressure,
      hiv_status,
      hepatitis_status,
    } = req.body;
    try {
      const report = await Report.findByPk(id);
      if (report) {
        await report.update({
          patientName,
          email,
          age,
          gender,
          phoneNumber,
          address,
          hospitalName,
          weight,
          height,
          bloodGroup,
          genotypes,
          bloodPressure,
          hiv_status,
          hepatitis_status,
        });
        res.json(report);
      } else {
        res.status(404).send('Report not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

  // Delete a report by ID
  static deleteReport = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const report = await Report.findByPk(id);
      if (report) {
        await report.destroy();
        res.send('Report deleted successfully');
      } else {
        res.status(404).send('Report not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
}

export default ReportsController;
