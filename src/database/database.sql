CREATE TABLE IF NOT EXISTS `sessions`
(
    uuid       VARCHAR(36) PRIMARY KEY,
    user_id    BIGINT UNSIGNED NOT NULL,
    expires_at TIMESTAMP       NULL,
    updated_at TIMESTAMP       NULL,
    created_at TIMESTAMP       NULL,
    constraint sessions_user_id_foreign foreign key (user_id) references users (id)
) collate = utf8mb4_unicode_ci
