<template>
    <b-modal :visible="show" @hide="closeModal">
      <template #modal-title>
        <h5>Create New Recipe</h5>
      </template>
      <div class="recipe-form" >
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="title">Title:</label>
            <input type="text" v-model="title" id="title" required />
          </div>
          <div class="form-group">
            <label for="image">Image URL:</label>
            <input type="url" v-model="image" id="image" required />
          </div>
          <div class="form-group">
            <label for="readyInMinutes">Ready in Minutes:</label>
            <input type="number" v-model="readyInMinutes" id="readyInMinutes" min="0" required />
          </div>
          <div class="form-group-options">
            <label for="vegetarian">Vegetarian:</label>
            <input type="checkbox" v-model="vegetarian" id="vegetarian" />
            <label for="vegan">Vegan:</label>
            <input type="checkbox" v-model="vegan" id="vegan" />
            <label for="glutenFree">Gluten Free:</label>
            <input type="checkbox" v-model="glutenFree" id="glutenFree" />
          </div>
          <div class="form-group">
            <label for="summary">Summary:</label>
            <textarea v-model="summary" id="summary" required></textarea>
          </div>
          <div class="form-group">
            <h3>Ingredients</h3>
            <div v-for="(ingredient, index) in ingredients" :key="index" class="ingredient">
              <input type="text" v-model="ingredient.name" placeholder="Ingredient Name" required />
              <input type="number" v-model="ingredient.amount" placeholder="Amount" min="0" required  class="type"/>
              <select v-model="ingredient.unit" required>
                <option value="tsp">tsp</option>
                <option value="tbsp">tbsp</option>
                <option value="cup">cup</option>
                <option value="oz">oz</option>
                <option value="lb">lb</option>
                <option value="ml">ml</option>
                <option value="l">l</option>
                <option value="g">g</option>
                <option value="kg">kg</option>
              </select>
              <button type="button" @click="removeIngredient(index)" class="remove">Remove</button>
            </div>
            <button type="button" @click="addIngredient">Add Ingredient</button>
          </div>
          <div class="form-group">
            <h3>Instructions</h3>
            <div v-for="(instruction, index) in instructions" :key="index" class="instruction">
              <textarea v-model="instruction.step" placeholder="Instruction" required></textarea>
              <button type="button" @click="removeInstruction(index)" class="remove">Remove</button>
            </div>
            <button type="button" @click="addInstruction">Add Instruction</button>
          </div>
          <div class="form-actions">
            <button type="submit">Add Recipe</button>
            <button type="button" @click="confirmReset">Reset</button>
          </div>
        </form>
  
        <!-- Reset Confirmation Modal -->
        <div v-if="showResetModal" class="modal">
          <div class="modal-content">
            <p>Are you sure you want to reset the form?</p>
            <button @click="resetForm">Yes</button>
            <button @click="closeResetModal">No</button>
          </div>
        </div>
  
        <!-- Save Confirmation Modal -->
        <div v-if="showSaveModal" class="modal">
          <div class="modal-content">
            <p>Recipe saved successfully!</p>
            <button @click="closeSaveModal">OK</button>
          </div>
        </div>
      </div>
    </b-modal>
  </template>
  
  <script>
  export default {
    name: 'CreateRecipe',
    props: {
      show: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        title: '',
        image: '',
        readyInMinutes: '',
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        summary: '',
        instructions: [{ step: '' }],
        ingredients: [{ name: '', amount: 0, unit: 'tsp' }],
        showResetModal: false,
        showSaveModal: false
      };
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      handleSubmit() {
        console.log('Recipe submitted:', {
          title: this.title,
          image: this.image,
          readyInMinutes: this.readyInMinutes,
          vegetarian: this.vegetarian,
          vegan: this.vegan,
          glutenFree: this.glutenFree,
          summary: this.summary,
          instructions: this.instructions,
          ingredients: this.ingredients
        });
        this.showSaveModal = true;
        this.resetForm();
      },
      addIngredient() {
        this.ingredients.push({ name: '', amount: 0, unit: 'tsp' });
      },
      removeIngredient(index) {
        this.ingredients.splice(index, 1);
      },
      addInstruction() {
        this.instructions.push({ step: '' });
      },
      removeInstruction(index) {
        this.instructions.splice(index, 1);
      },
      resetForm() {
        this.title = '';
        this.image = '';
        this.readyInMinutes = '';
        this.vegetarian = false;
        this.vegan = false;
        this.glutenFree = false;
        this.summary = '';
        this.instructions = [{ step: '' }];
        this.ingredients = [{ name: '', amount: 0, unit: 'tsp' }];
        this.showResetModal = false;
      },
      confirmReset() {
        this.showResetModal = true;
      },
      closeResetModal() {
        this.showResetModal = false;
      },
      closeSaveModal() {
        this.showSaveModal = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
  }
  .recipe-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    width: 100%;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: auto;
  }
  .form-group-options {
    align-items: center;
    flex-direction: row;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .options {
    display: flex;
    gap: 20px;
    align-items: center;
  }
  .ingredient,
  .instruction {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 10px;
    align-items: center;
    flex-direction: row;
  }
  .ingredient input,
  .instruction textarea {
    flex: 1;
    height: 35px;
  }
  textarea {
    height: 100px;
  }
  button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 2px;
  }
  button:hover {
    background-color: #0056b3;
  }
  .form-actions {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  .remove {
    background-color: #cc0909;
  }
  .type{
    width: 30%;
  }

  .modal-content {
    background-color: #fff;
    width: 30%;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
    }
</style>
