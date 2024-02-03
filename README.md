# Goal of the Test

Reproduce the Phantoms dashboard of a PhantomBuster user.

# Functional instructions

This exercise aims to reproduce the Phantoms dashboard of a PhantomBuster user
functionally.
On the visual side, it should be similar but does not have to be identical.
Here you can find the dashboard page (please sign up as it is accessible only for logged
users): https://phantombuster.com/phantoms

You can find the TypeScript file representing the interface (“IPhantoms”) and the JSON
payload to use as an example in the attachments.

The page must contain:

\_- The list of Phantoms with at least:

- Name of the Phantom
- A drop-down menu with options “rename,” “duplicate,” and “delete”
- Launch frequency
- Time remaining before the next auto-launch

- Categories filter

  - Show only the category name, no icon
  - Filter only one category at once
  - Filter persistence by URL when the page is refreshed

- A Detail view for each Phantom using a router.
- Search functionality
- A countdown of the time remaining before the next auto-launch
- Anything else that comes to your mind that would improve the project

#\_ Technical requirements

- Code in complete strict TypeScript (strict null checks, no any, ...)
- Use https://tailwindcss.com/ for all styles
- Use React with hooks
- Do not use redux or similar library
- Code at least one unitary test (for example, display of the remaining time)
- Load the given payload like an external API call
- Use localStorage as a cache to make everything work persistently:
  the list of Phantoms as well as the "rename," "duplicate," and "delete" actions.
  If data is cached, ignore the API, add a button to reset the cache, and reload the API

# Our expectations:

We are interested to see your approach, your way of thinking, and your coding skills.

The visual aspect of the final render does not need to be identical to the original
dashboard, neither in shape nor colors; however, we would love for your work to be
visually appealing ;)
