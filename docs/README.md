<h1> AMRAP API</h1>

<p>
A backend service for managing <strong>gyms, users, and memberships</strong>, built using:
</p>

<ul>
  <li>Node.js</li>
  <li>TypeScript</li>
  <li>Express</li>
  <li>Prisma ORM (SQLite)</li>
  <li>Clean Architecture</li>
  <li>Swagger (OpenAPI)</li>
</ul>

<hr/>

<h2> Project Structure</h2>

<pre>
src/
 ├── domain/               # Entities & repository interfaces
 ├── application/          # Use-cases, DTOs, business logic, errors
 ├── infrastructure/       # Prisma client, DB, repository implementations
 └── interface/
       └── http/           # Controllers, routes, server config
</pre>

<hr/>

<h2>Setup Instructions</h2>

<h3>1. Clone the Repository</h3>
<pre><code>git clone https://github.com/patel-jhanvi/amrap-gym-api.git
cd amrap-gym-api
</code></pre>

<h3>2. Install Dependencies</h3>
<pre><code>npm install
</code></pre>

<h3>3. Environment Variables (.env)</h3>
<pre><code>DATABASE_URL="file:./prisma/dev.db"
PORT=3000
</code></pre>

<p><strong>Note:</strong> On Railway, <code>DATABASE_URL</code> is set in the dashboard.</p>

<h3>4. Run Prisma Migrations</h3>
<pre><code>npx prisma migrate dev --name init
</code></pre>

<h3>5. Generate Prisma Client</h3>
<pre><code>npx prisma generate
</code></pre>

<h3>6. Start Development Server</h3>
<pre><code>npm run dev
</code></pre>

<p>Local server:</p>
<pre>http://localhost:3000</pre>

<h3>7. Build & Start Production</h3>
<pre><code>npm run build
npm start
</code></pre>

<hr/>

<h2> How to Run Tests (Postman)</h2>

<p>
This project was manually tested using <strong>Postman</strong>.  
All endpoints were validated for:
</p>

<ul>
  <li>Correct request/response format</li>
  <li>Validation errors</li>
  <li>Membership capacity rules</li>
  <li>Join-date ordering</li>
</ul>

<h3>Steps to run tests:</h3>

<ol>
  <li>Start the server:<br/>
  <pre><code>npm run dev</code></pre></li>

  <li>Open Postman and send requests to:<br/>
  <pre>http://localhost:3000</pre></li>

  <li>Use the following routes:</li>
</ol>

<table>
  <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
  <tr><td>POST</td><td>/users</td><td>Create a user</td></tr>
  <tr><td>POST</td><td>/gyms</td><td>Create a gym</td></tr>
  <tr><td>POST</td><td>/memberships</td><td>Add user to gym</td></tr>
  <tr><td>GET</td><td>/users</td><td>List all users</td></tr>
  <tr><td>GET</td><td>/gyms</td><td>List all gyms</td></tr>
  <tr><td>GET</td><td>/gyms/:id/users</td><td>Check members sorted by join date</td></tr>
</table>

<p>
Postman test screenshots are available in the 
<code>docs/screenshots/</code> folder.
</p>


<h2>API Documentation (Swagger)</h2>

<table>
  <tr>
    <th>Environment</th>
    <th>URL</th>
  </tr>
  <tr>
    <td>Local</td>
    <td><a href="http://localhost:3000/docs">http://localhost:3000/docs</a></td>
  </tr>
  <tr>
    <td>Production</td>
    <td><a href="https://amrap-gym-api-production.up.railway.app/docs">https://amrap-gym-api-production.up.railway.app/docs</a></td>
  </tr>
</table>

<hr/>

<h2> API Endpoints</h2>

<h3>Users</h3>

<table>
  <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
  <tr><td>POST</td><td>/users</td><td>Create user</td></tr>
  <tr><td>GET</td><td>/users</td><td>List users</td></tr>
  <tr><td>GET</td><td>/users/:id</td><td>Get user by ID</td></tr>
  <tr><td>GET</td><td>/users/:id/gyms</td><td>Gyms a user belongs to</td></tr>
  <tr><td>PUT</td><td>/users/:id</td><td>Update a user</td></tr>
</table>

<h3> Gyms</h3>

<table>
  <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
  <tr><td>POST</td><td>/gyms</td><td>Create gym</td></tr>
  <tr><td>GET</td><td>/gyms</td><td>List gyms</td></tr>
  <tr><td>GET</td><td>/gyms/:id</td><td>Get gym</td></tr>
  <tr><td>GET</td><td>/gyms/:id/users</td><td>Users in a gym</td></tr>
  <tr><td>GET</td><td>/gyms/available/spots</td><td>Gyms sorted by free capacity</td></tr>
</table>

<h3> Memberships</h3>

<table>
  <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
  <tr><td>POST</td><td>/memberships</td><td>Add user to gym</td></tr>
  <tr><td>DELETE</td><td>/memberships</td><td>Remove user from gym</td></tr>
</table>

<h4>Example Body:</h4>
<pre><code>{
  "userId": "<user-id>",
  "gymId": "<gym-id>"
}
</code></pre>

<hr/>

<h2> Deployment (Railway)</h2>

<p><strong>Production Base URL:</strong></p>
<pre><a href="https://amrap-gym-api-production.up.railway.app">https://amrap-gym-api-production.up.railway.app</a></pre>

<p><strong>Example:</strong></p>
<pre>GET https://amrap-gym-api-production.up.railway.app/users</pre>

<hr/>

<h2>Technical Decisions</h2>

<ul>
  <li><strong>Clean Architecture:</strong> strict separation of domain, application, infrastructure, interface</li>
  <li><strong>Prisma ORM:</strong> type-safe schema, migrations, query validation</li>
  <li><strong>SQLite:</strong> lightweight & Railway-compatible</li>
  <li><strong>Business logic in use-cases:</strong> capacity checks, join-date ordering</li>
  <li><strong>Controllers remain thin:</strong> only HTTP translation</li>
  <li><strong>Manual Postman testing:</strong> validated all endpoints</li>
</ul>

<hr/>

<h2>Author</h2>

<p><strong>Jhanvi Patel</strong></p>
