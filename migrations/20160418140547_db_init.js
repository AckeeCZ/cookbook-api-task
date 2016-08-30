exports.up = function(knex, Promise) {
    return knex.transaction(t => {
        return Promise.all([
            t.schema.createTable('user', (table) => {
                table.increments('id')
                    .primary();
                table.string('username')
                    .notNullable()
                    .unique();
                table.string('email')
                    .notNullable();

                table.string('password')
                    .notNullable();
                table.string('password_salt');
                table.string('fb_id')
                    .unique();
                table.string('google_id')
                    .unique();
                table.string('device_id')
                    .unique();
                table.boolean('enabled')
                    .defaultTo(true);
                table.boolean('anonymous')
                    .defaultTo(false);
            }),
            t.schema.createTable('role', table => {
                table.increments('id')
                    .primary();
                table.string('name')
                    .notNullable()
                    .unique();
            }),
            t.schema.createTable('user_role', table => {
                table.integer('user_id')
                    .unsigned();
                table.integer('role_id')
                    .unsigned();
                table.primary(['user_id', 'role_id']);
                table.foreign('user_id').references('user.id');
                table.foreign('role_id').references('role.id');
            }),
            t.schema.createTable('tokens', table => {
                table.increments('id')
                    .primary();
                table.string('_id');
                table.integer('user')
                    .unsigned()
                    .references('id')
                    .inTable('user');
                table.dateTime('valid');
                table.string('type');
                table.unique('_id');
            }),
        ]);
    });
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('user_role'),
        knex.schema.dropTable('tokens'),
        knex.schema.dropTable('user'),
        knex.schema.dropTable('role'),
    ]);
};
