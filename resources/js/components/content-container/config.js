/**
 * Статусы загрузки
 * @type {{Ready: string, Empty: string, Loading: string, Error: string}}
 */
export const LoadingStatuses = {
    Start: 'START', // начальное положение
    Loading: 'LOADING', // идёт загрузка
    Ready: 'READY', // загрузка завершена, есть результаты
    Empty: 'EMPTY', // загрузка завершена, нет результатов
    Error: 'ERROR', // загрузка завершена с ошибкой
};
