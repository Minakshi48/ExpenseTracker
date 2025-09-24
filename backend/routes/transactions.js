const express = require('express');
const { body, query, param, validationResult } = require('express-validator');
const Transaction = require('../models/Transaction');

const router = express.Router();

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

// Create transaction
router.post('/',
  body('type').isIn(['income','expense']),
  body('amount').isNumeric(),
  body('category').notEmpty(),
  body('description').optional(),
  body('date').optional().isISO8601().toDate(),
  handleValidation,
  async (req, res, next) => {
    try {
      const tx = new Transaction(req.body);
      await tx.save();
      res.status(201).json(tx);
    } catch (err) { next(err); }
  });

// Read transactions
router.get('/', 
  query('type').optional().isIn(['income','expense']),
  query('category').optional(),
  query('startDate').optional().isISO8601(),
  query('endDate').optional().isISO8601(),
  query('page').optional().toInt(),
  query('limit').optional().toInt(),
  handleValidation,
  async (req, res, next) => {
    try {
      const { type, category, startDate, endDate, page = 1, limit = 50 } = req.query;
      const filter = {};
      if(type) filter.type = type;
      if(category) filter.category = category;
      if(startDate || endDate) filter.date = {};
      if(startDate) filter.date.$gte = new Date(startDate);
      if(endDate) filter.date.$lte = new Date(endDate);

      const skip = (page-1)*limit;
      const [items, total] = await Promise.all([
        Transaction.find(filter).sort({ date:-1 }).skip(skip).limit(limit),
        Transaction.countDocuments(filter)
      ]);
      res.json({ items, total, page: Number(page), limit: Number(limit) });
    } catch(err){ next(err); }
  });

// Get single
router.get('/:id', param('id').isMongoId(), handleValidation, async (req,res,next)=>{
  try{
    const tx = await Transaction.findById(req.params.id);
    if(!tx) return res.status(404).json({message:'Transaction not found'});
    res.json(tx);
  } catch(err){ next(err);}
});

// Update
router.put('/:id',
  param('id').isMongoId(),
  body('type').optional().isIn(['income','expense']),
  body('amount').optional().isNumeric(),
  body('category').optional(),
  body('description').optional(),
  body('date').optional().isISO8601().toDate(),
  handleValidation,
  async (req,res,next)=>{
    try{
      const tx = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators:true });
      if(!tx) return res.status(404).json({message:'Transaction not found'});
      res.json(tx);
    } catch(err){ next(err); }
  });

// Delete
router.delete('/:id', param('id').isMongoId(), handleValidation, async (req,res,next)=>{
  try{
    const tx = await Transaction.findByIdAndDelete(req.params.id);
    if(!tx) return res.status(404).json({message:'Transaction not found'});
    res.json({message:'Deleted', id: tx._id});
  } catch(err){ next(err);}
});

module.exports = router;
