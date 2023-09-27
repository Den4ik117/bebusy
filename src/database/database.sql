create table users
(
    id             bigint unsigned auto_increment
        primary key,
    uuid           char(36)             not null,
    foreign_id     varchar(255)         not null,
    first_name     varchar(255)         not null,
    middle_name    varchar(255)         null,
    last_name      varchar(255)         not null,
    email          varchar(255)         null,
    is_bot         tinyint(1) default 0 not null,
    data           json                 not null,
    token          varchar(255)         null,
    webhook_url    varchar(255)         null,
    remember_token varchar(100)         null,
    created_at     timestamp            null,
    updated_at     timestamp            null
) collate = utf8mb4_unicode_ci;

CREATE TABLE sessions
(
    uuid             VARCHAR(36) PRIMARY KEY,
    user_id          BIGINT UNSIGNED NOT NULL,
    hh_access_token  VARCHAR(255)    NULL,
    hh_expires_at    TIMESTAMP       NULL,
    hh_refresh_token VARCHAR(255)    NULL,
    expires_at       TIMESTAMP       NOT NULL,
    updated_at       TIMESTAMP       NULL,
    created_at       TIMESTAMP       NULL,
    constraint sessions_user_id_foreign foreign key (user_id) references users (id) on delete restrict
) collate = utf8mb4_unicode_ci;

create table chats
(
    id         bigint unsigned auto_increment
        primary key,
    uuid       char(36)                       not null,
    name       varchar(255)                   not null,
    type       varchar(255) default 'PRIVATE' not null,
    created_at timestamp                      null,
    updated_at timestamp                      null
)
    collate = utf8mb4_unicode_ci;

create index chats_type_index
    on chats (type);

create table chat_user
(
    chat_id bigint unsigned not null,
    user_id bigint unsigned not null,
    constraint chat_user_chat_id_foreign
        foreign key (chat_id) references chats (id),
    constraint chat_user_user_id_foreign
        foreign key (user_id) references users (id)
) collate = utf8mb4_unicode_ci;

create table resumes
(
    id           bigint unsigned auto_increment
        primary key,
    user_id      bigint unsigned not null,
    data         json            not null,
    created_at   timestamp       null,
    updated_at   timestamp       null,
    published_at timestamp       null,
    uuid         char(36)        not null,
    constraint resumes_user_id_foreign
        foreign key (user_id) references users (id)
) collate = utf8mb4_unicode_ci;

-- auto-generated definition
create table messages
(
    id         bigint unsigned auto_increment
        primary key,
    text       varchar(1024)   not null,
    user_id    bigint unsigned null,
    chat_id    bigint unsigned not null,
    resume_id  bigint unsigned null,
    actions    json            null,
    created_at timestamp       null,
    updated_at timestamp       null,
    constraint messages_chat_id_foreign
        foreign key (chat_id) references chats (id),
    constraint messages_user_id_foreign
        foreign key (user_id) references users (id),
    constraint messages_resume_id_foreign
        foreign key (resume_id) references resumes (id)
)
    collate = utf8mb4_unicode_ci;


-- auto-generated definition
create table files
(
    id            bigint unsigned auto_increment
        primary key,
    content       varchar(255)    not null,
    fileable_type varchar(255)    not null,
    fileable_id   bigint unsigned not null,
    created_at    timestamp       null,
    updated_at    timestamp       null
)
    collate = utf8mb4_unicode_ci;

create index files_fileable_type_fileable_id_index
    on files (fileable_type, fileable_id);


create table opinions
(
    id           bigint unsigned auto_increment primary key,
    resume_id    bigint unsigned   not null,
    user_id      bigint unsigned   not null,
    photo        smallint unsigned null,
    readable     smallint unsigned null,
    capacity     smallint unsigned null,
    experience   smallint unsigned null,
    total        smallint unsigned null,
    comment      varchar(1024)     null,
    completed_at timestamp         null,
    created_at   timestamp         null,
    updated_at   timestamp         null,
    constraint opinions_resume_id_foreign
        foreign key (resume_id) references resumes (id),
    constraint opinions_user_id_foreign
        foreign key (user_id) references users (id)
) collate = utf8mb4_unicode_ci;

-- auto-generated definition
create table updates
(
    id           bigint unsigned auto_increment
        primary key,
    message_id   bigint unsigned not null,
    user_id      bigint unsigned not null,
    processed_at timestamp       null,
    constraint updates_message_id_foreign
        foreign key (message_id) references messages (id),
    constraint updates_user_id_foreign
        foreign key (user_id) references users (id)
) collate = utf8mb4_unicode_ci;

create table node_chat
(
    chat_id bigint unsigned not null,
    user_id bigint unsigned not null,
    node_id bigint unsigned not null,
    constraint node_chat_chat_id_foreign foreign key (chat_id) references chats (id) on delete restrict,
    constraint node_chat_user_id_foreign foreign key (user_id) references users (id) on delete restrict,
    unique index node_chat_chat_user_index (chat_id, user_id)
) collate = utf8mb4_unicode_ci;
