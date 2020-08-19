# Rep-Review

**Duration: 2 Weeks**

Rep-Review is an informational app designed to provide users with information about their representatives in congress. The app uses multiple APIs to dynamically generate content for thousands of pages. On the landing page, users can enter a zip code to see their senators and district representative, as well as congressional statements mentioning their home state. Additional features include biographical and contact information for all 535 members of congress, searchable press releases, information on congressional committees, voting records, and an internal bookmarking system.

![Overview](public/images/example.gif)



## Setup

1. Obtain a free API key for the ![Propublica Congress API](https://www.propublica.org/datastore/api/propublica-congress-api)
2. Create a .env file within the project and add PROPUBLICA_API_KEY=YOUR_API_KEY
3. Create a database called 'rep_review' and run the query from the database.sql file to build the necessary tables. 
2. Use the "$ npm install" command to install dependencies.
3. Use the "$ npm run server" command to start the server. 
4. Use the "$ npm run client" command to start the react development build. 
5. Access the webpage via the url "localhost:3000"


## Usage

1. Using the app does not require an account, but creating one will allow users to add bookmarks and see local information. Users can register by clicking the 'Log In' button in the upper-right corner of the app.
2. On the homepage enter a zip code to see the representative for that district as well as the senators for the associated state. 
3. Use the buttons on the left side of the page to navigate to different features of the application.
  - News - Features all statements from members of congress released on the current date. The Search field allows you to look for statements about specific subjects.
  - Search - The search field allows users to search for congress members by first name, last name, or their full name. Alternately, they can click one of the states to view all senators and house members from that state. Clicking on any member listing will bring the user to the associated member page.
  - Bills - This page lists bill that have recently been acted on in some way by congress. Bill listings can be clicked for more details and a link to the text on the Congress.gov website.
  - Votes - This page lists the most recent votes in both the house and senate, as well as the outcome of the vote.
  - Committees - Here users can view a full listing of all house, senate, and joint committees of congress. Clicking on a listing will provide some information about the committee, a link to the committee website, and a full list of all committee members.
  - Bookmarks - Any member pages that have been bookmarked will be listed here. Listings can be clicked on to go back to the member page.
4. Member pages can be bookmarked by clicking the star icon in the upper-right corner of their biography. Bookmarks can be removed by clicking the icon again. 
5. Member Pages have some nested information beneath the main biography section. Nested lists can be opened by clicking their headings.
  - Recent Statements - A list of the 20 most recent statements made by this member.
  - Recent Bills Introduced - A list of the 20 most recent bills introduced by this member.
  - Recent Voting History - A list of the 20 most recent bills this member has voted on and how they voted.
  - Committee Memberships - A list of all congressional committees this member belongs to.
6. Users can log out by clicking the "Log Out" button in the upper-right corner of the app.


## Scope Documentation

The scope documentation shows what I had in mind when designing Rep-Review. Here you can see how the different features of the project were outlined and described before implementation: ![Scope Document](https://docs.google.com/document/d/e/2PACX-1vRHPk9CBIjgbx_mPQGPxvghJ-Ndj0X2SyAi8eIlchOCfSFeDtbu-8IUAsgxCkHgZh-nITrEJ5AcBv4z/pub)


## APIs Used

- The excellent [ProPublica Congress API](https://projects.propublica.org/api-docs/congress-api/) provides the data used for congress members, voting history, bills, committees, and statements.
- The [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) provides the biographical data about members and congress as well as descriptions of congressional committees.
- The API at [whoismyrepresentative.com](https://whoismyrepresentative.com/api) translates zip codes into congressional districts.
- [theunitedstates.io](https://github.com/unitedstates/images) provides public domain images of congress members.


## Built With

JavaScript, React, Node.js, Express, PostgreSQL, Redux, Redux-Saga, Material-UI


## Acknowledgements

I'd like to thank [ProPublica.org](https://www.propublica.org/) for their amazing congressional API, this project would have been impossible without it.

Also I'm very grateful to Wikipedia and the Wikimedia foundation for their biographical information about congress members, and everything they do to make information accessible to people around the world.

Finally, thanks go to my instructors and peers at [Prime Digital Academy](https://www.primeacademy.io) who equipped me and helped to make this application a reality.