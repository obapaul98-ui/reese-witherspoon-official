import re

with open('welcome-email.html', 'r') as f:
    html = f.read()

# Remove the preview banner
html = re.sub(r'<!-- Local Preview Notification Banner.*?</table>', '', html, flags=re.DOTALL)

# Replace placeholders
html = html.replace('[Member Name]', '${from_name}')
html = html.replace('src="reesewitherspoon/', 'src="https://reesewitherspoonofficial.com/reesewitherspoon/')
html = html.replace('http://localhost:8000/', 'https://reesewitherspoonofficial.com/')

# Escape backticks and dollar signs (except for our variables)
# Wait, replacing all $ with \$ might break ${from_name}, so let's just use string replacement in JS or be careful.
# Actually, since it's an HTML file, there probably aren't any backticks or unescaped ${} besides the one we just added.
# Let's check for backticks.
html = html.replace('`', '\\`')

template_content = f"""
export function getWelcomeEmailHtml(from_name, from_email) {{
  return `{html}`;
}}
"""

with open('api/template.js', 'w') as f:
    f.write(template_content)

print("Created api/template.js")
