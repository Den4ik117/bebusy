export const UserRoleEnum = {
    Bot: 'BOT',
    User: 'USER',
    Admin: 'ADMIN',
}

export const UserRoleEnumTranslates = {
    [UserRoleEnum.Bot]: 'Бот',
    [UserRoleEnum.User]: 'Пользователь',
    [UserRoleEnum.Admin]: 'Администратор',
}

export const RequestType = {
  RequestCodeReview: 'REQUEST_CODE_REVIEW',
}

export const RequestTypeTranslates = {
  [RequestType.RequestCodeReview]: 'Заявка на код-ревью',
}

export const RequestState = {
  New: 'NEW',
  Reviewed: 'REVIEWED',
}

export const RequestStateTranslates = {
  [RequestState.New]: 'Новая',
  [RequestState.Reviewed]: 'Рассмотрено',
}

export const RequestStateColors = {
  [RequestState.New]: 'blue',
  [RequestState.Reviewed]: 'gray',
}
