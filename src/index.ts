export function hello() {
  return 'Hello Apps Script!';
}

export function greet(name: string) {
  return `Hello, ${name}!`;
}

export function doGet() {
  return HtmlService.createTemplateFromFile('ui').evaluate().setTitle('');
}

export function include(filename: string) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
