const pool = require('./pool');

async function createTables(tableQueries) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        for (const [tableName, query] of Object.entries(tableQueries)) {
            await client.query(query);
            console.log(`Table ${tableName} created successfully`);
        }

        await client.query('COMMIT');
        console.log('All tables created successfully');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error creating tables:', error);
    } finally {
        client.release();
    }
}

/*
 ===== EXAMPLE OF USAGE ====
const tableQueries = {
    users: usersTableQuery,
}

createTables(tableQueries)
  .then(() => console.log('Table created successfully'))
  .catch(console.error);
*/

const businessQuery = `
    create table if not exists businesses ( 
	businessId varchar(255) PRIMARY KEY,
	name varchar(255) not null,
	city varchar(255) not null,
	address varchar(255) not null,
	rank float not null,
	description varchar(255) not null,
	imageUrl varchar(255)
	ts timestamp default current_timestamp
)`;

const accountsQuery = '\
    create table if not exists accounts (\
	accountId varchar(255) PRIMARY KEY GENERATED ALWAYS AS (email) STORED,\
	fullName varchar(255) not null, \
	phoneNumber varchar(255) not null,\
	address varchar(255) not null,\
	email varchar(255) not null,\
	birthDate date not null,\
	password varchar(255) not null,\
	imageUrl varchar(255)\
)'

const paymentMethodsQuery = '\
    create table if not exists PaymentMethods (\
	accountId varchar(255) primary key,\
	cardNumber varchar(16) not null unique,\
	experationDate date not null,\
	cvv varchar(3) not null,\
	citizenId varchar(9) not null unique,\
	type varchar(255) not null,\
	FOREIGN key (accountId) REFERENCES accounts(accountId)\
)'

const tablesQuery = '\
    create table if not exists Tables (\
	tableId varchar(4) not null,\
	businessId varchar(255) not null,\
	numberOfPeople integer check (numberOfPeople > 0 and numberOfPeople <= 10) not null,\
	primary key (tableId, businessId),\
	FOREIGN key (businessId) REFERENCES businesses(businessId)\
)'

const itemsQuery = '\
    create table if not exists items (\
	itemId UUID primary key DEFAULT uuid_generate_v4(),\
	businessId varchar(255) not null,\
	name varchar(60) not null,\
	description varchar(255) not null,\
	price DECIMAL(5, 2) not null,\
	image varchar(255),\
	foreign key (businessId) references businesses(businessId)\
)'

reservationsQuery = `
    create table if not exists reservations (
	reservationId UUID primary key DEFAULT uuid_generate_v4(),
	tableId varchar(4) not null,
	businessId varchar(255) not null,
	accountId varchar(255) not null,
	reservationDateTime timestamp not null,
	type varchar(10) not null,
	additionalRequest varchar(255),
	numberOfPeople integer check (numberOfPeople > 0 and numberOfPeople <= 10) not null
)`

const virtualTablesQuery = "\
    create table if not exists virtual_tables (\
	virtualTableId UUID primary key DEFAULT uuid_generate_v4(),\
	tableId varchar(4) not null,\
	businessId varchar(255) not null,\
	creationTS timestamp DEFAULT CURRENT_TIMESTAMP,\
	name varchar(255) DEFAULT 'New Dobo' not null,\
	active boolean DEFAULT true,\
	FOREIGN KEY (tableId, businessId) REFERENCES Tables(tableId, businessId)\
)"

const clientsQuery = `
    create table if not exists clients (
	clientId UUID primary key DEFAULT uuid_generate_v4(),
	virtualTable UUID not null,
	accountId varchar(255) not null,
	active boolean default true,
	foreign key (virtualTable) references virtual_tables(virtualTableID),
	foreign key (accountId) references accounts(accountId)
)`

const ordersQuery = `
    create table if not exists orders (
	orderId UUID primary key default uuid_generate_v4(),
	itemId UUID not null,
	virtualTable UUID not null,
	status varchar(15) default 'pending',
	ts timestamp default current_timestamp,
	foreign key (itemId) references items(itemId),
	foreign key (virtualTable) references virtual_tables(virtualTableId)
)`

const clientOrdersQuery = `
	create table if not exists clientOrders (
		clientId UUID,
		orderId UUID,
		cost DECIMAL(5, 2) not null,
		paid boolean default false,
		foreign key (clientId) references clients(clientId),
		foreign key (orderId) references orders(orderId),
		primary key (clientId, orderId)
	)
`