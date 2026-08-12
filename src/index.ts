export function hello() {
  return 'Hello Apps Script!';
}

export function doGet() {
  return HtmlService.createTemplateFromFile('ui').evaluate().setTitle('');
}

export function include(filename: string) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
