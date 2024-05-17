<script lang="ts">
</script>

<section>
  <form id="taskForm">
      <div>
          <label for="taskName">Task Name:</label>
          <input type="text" id="taskName" name="taskName" required>
      </div>

      <div>
          <label for="startTime">Start Time:</label>
          <input type="datetime-local" id="startTime" name="startTime">
      </div>

      <div>
          <label for="endTime">End Time:</label>
          <input type="datetime-local" id="endTime" name="endTime">
      </div>

      <div>
          <label for="taskDuration">Task Duration:</label>
          <input type="number" id="taskDuration" name="taskDuration">
      </div>

      <div>
          <label for="resource">Resource:</label>
          <select id="resource" name="resource">
              <option value="">Select a resource</option>
              <!-- Options for resources go here -->
          </select>
      </div>

      <div>
          <label for="dependency">Dependency:</label>
          <select id="dependency" name="dependency">
              <option value="">Select a dependency</option>
              <!-- Options for dependencies go here -->
          </select>
      </div>

      <div>
          <label for="location">Location:</label>
          <input type="text" id="location" name="location">
      </div>

      <!-- Add more fields as needed -->

      <div>
          <input type="submit" value="Submit">
      </div>
  </form>
</section>


<style>
#taskForm {
    width: 50%;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
}

#taskForm div {
    margin-bottom: 15px;
}

#taskForm label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

#taskForm input[type="text"],
#taskForm input[type="datetime-local"],
#taskForm input[type="number"],
#taskForm select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-sizing: border-box;
}

#taskForm input[type="submit"] {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

#taskForm input[type="submit"]:hover {
    background-color: #45a049;
}

</style>
