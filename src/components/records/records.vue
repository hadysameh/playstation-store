<template>
  <div class="container">
      <div class="container d-flex">
          date 
          <input type="date">
      </div>
      <table>
          <thead>
            <th>
                device
            </th>
            <th>
                duration
            </th>
            <th>
                number of hours
            </th>
            <th>
                options
            </th>
          </thead>
          <tbody>
              <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                      <button>edit</button>
                      <button>delete</button>
                  </td>
              </tr>
          </tbody>
          
      </table>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
       </nav>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>