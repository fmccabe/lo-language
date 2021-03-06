'use babel';

import LoLanguage from '../lib/lo-language';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('LoLanguage', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('lo-language');
  });

  describe('when the lo-language:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.lo-language')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'lo-language:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.lo-language')).toExist();

        let loLanguageElement = workspaceElement.querySelector('.lo-language');
        expect(loLanguageElement).toExist();

        let loLanguagePanel = atom.workspace.panelForItem(loLanguageElement);
        expect(loLanguagePanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'lo-language:toggle');
        expect(loLanguagePanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.lo-language')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'lo-language:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let loLanguageElement = workspaceElement.querySelector('.lo-language');
        expect(loLanguageElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'lo-language:toggle');
        expect(loLanguageElement).not.toBeVisible();
      });
    });
  });
});
