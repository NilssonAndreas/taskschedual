<!-- add / delete category in  db -->
<script>
  import {
    addCategory,
    deleteCategory,
    getCategories,
  } from "./HelperFunc/databseQuerys";
  import { Label, Input, Select, Button, Helper } from "flowbite-svelte";
  let addCategoryName = "";
  let deleteCategoryName = "";
  let invalidAdd = false;
  let invalidDelete = false;
  let categoryExists = false;
  let categoryExistsError = false;
  let promise = getCategories();

  /**
   * updated actual time for tasks
   * @async
   * @param  {string} stringToValidate
   */
  async function validateAdd(stringToValidate) {
    if (stringToValidate == "" || stringToValidate == null) {
      invalidAdd = true;
      categoryExistsError = false;
    } else {
      await promise.then((value) =>
        checkIfCategoryExists(value, stringToValidate)
      );

      if (categoryExists) {
        invalidAdd = false;
        categoryExistsError = true;
        categoryExists = false;
        return;
      } else {
        addCategory(stringToValidate);
        invalidAdd = false;
        categoryExists = false;
        categoryExistsError = false;
        addCategoryName = "";
        promise = getCategories();
      }
    }
  }

  /**
   * Checks if category is in databse
   * @param  {string} stringToValidate
   * @param  {array} categoryArray
   */
  function checkIfCategoryExists(categoryArray, nameString) {
    for (const item of categoryArray) {
      if (item.value.includes(nameString)) {
        categoryExists = true;
      }
    }
  }

  /**
   * Validates delte input
   * @param  {string} stringToValidate
   */
  function validateDelete(stringToValidate) {
    if (stringToValidate == "" || stringToValidate == null) {
      invalidDelete = true;
    } else {
      deleteCategory(stringToValidate);
      invalidDelete = false;
      deleteCategoryName = "";
      promise = getCategories();
    }
  }
</script>

<div class="grid grid-cols-2 gap-4">
  <!-- Add -->
  <div class="col-span-2">
    {#if invalidAdd}
      <Helper class="mt-1" color="red"
        ><span class="font-bold text-sm">Error!</span> Enter a name</Helper
      >
    {/if}
    {#if categoryExistsError}
      <Helper class="mt-1" color="red"
        ><span class="font-bold text-sm">Error!</span> Category already exist</Helper
      >
    {/if}

    <Label for="add" class="block mb-2">Add category</Label>
    <Input
      id="add"
      type="text"
      placeholder="Enter category name"
      bind:value={addCategoryName}
    />
    <div class="mt-2">
      <Button
        gradient
        color="purple"
        size="xs"
        on:click={() => validateAdd(addCategoryName)}
        >Add Category
      </Button>
    </div>
  </div>

  <!-- Delete -->
  <div class="col-span-2">
    {#if invalidDelete}
      <Helper class="mt-1" color="red"
        ><span class="font-bold text-sm">Error!</span> Choose Category</Helper
      >
    {/if}
    {#await promise}
      <Label
        >Delete category
        <Select class="mt-2" value="" />
      </Label>
    {:then value}
      <Label
        >Delete category
        <Select class="mt-2" items={value} bind:value={deleteCategoryName} />
      </Label>
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
    <div class="mt-2">
      <Button
        gradient
        color="purple"
        size="xs"
        on:click={() => validateDelete(deleteCategoryName)}
        >Delete Category
      </Button>
    </div>
  </div>
</div>
