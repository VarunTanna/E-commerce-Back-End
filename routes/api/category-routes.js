const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const category = await Category.findAll({
      include: [Product],
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err)
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [Product],
    })
    if (!category) {
      res.status(404).json({ message: "no category found with this id." });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const category = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!category) {
      res.status(404).json({ message: "no category found with that id." });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json()
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const catDelete = await Category.destroy({
      where: {
        id: req.params.id
      },
    });
    if (!catDelete) {
      res.status(404).json({ message: "Category deleted." });
      return;
    }
    res.status(200).json(catDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
