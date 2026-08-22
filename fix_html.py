import re

with open('welcome-email.html', 'r') as f:
    html = f.read()

# 1. Fix the invalid table nesting around line 246
# Find:
#                   </td>
#         <!-- Main Welcome Card -->
#         <table
# And replace it with:
#                   </td>
#                 </tr>
#                 <tr>
#                   <td style="padding-bottom: 30px;">
#         <!-- Main Welcome Card -->
#         <table

html = html.replace("""                  </td>
        <!-- Main Welcome Card -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">""",
"""                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 30px;">
        <!-- Main Welcome Card -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">""")

# And close the td around line 298
html = html.replace("""              <p style="text-align: center; color: #A0AEC0; font-size: 14px; margin-top: 30px;">Stay connected and enjoy all the perks starting today!</p>
            </td>
          </tr>
        </table>

                <!-- Call to Action -->""",
"""              <p style="text-align: center; color: #A0AEC0; font-size: 14px; margin-top: 30px;">Stay connected and enjoy all the perks starting today!</p>
            </td>
          </tr>
        </table>
                  </td>
                </tr>

                <!-- Call to Action -->""")

# 2. Fix the email container width to be responsive
html = html.replace('width="600" border="0" cellspacing="0" cellpadding="0" style="width: 600px; max-width: 600px;', 
                    'width="100%" border="0" cellspacing="0" cellpadding="0" style="width: 100%; max-width: 600px;')

# 3. Fix the image container responsiveness
# The hero image has width="520" but we can keep it as 100% max-width 520px
html = html.replace('width="520" style="width: 100%; max-width: 520px;', 
                    'width="100%" style="width: 100%; max-width: 520px;')

# 4. Remove the huge padding on mobile by using inline percentage padding or better defaults
html = html.replace('padding: 35px 40px 25px 40px;', 'padding: 35px 5% 25px 5%;')
html = html.replace('padding: 0 40px;', 'padding: 0 5%;')
html = html.replace('padding: 40px 40px 30px 40px;', 'padding: 40px 5% 30px 5%;')
html = html.replace('padding: 45px 40px 40px 40px;', 'padding: 45px 5% 40px 5%;')
html = html.replace('padding: 40px;', 'padding: 20px 5%;') # For the inner welcome card box


with open('welcome-email.html', 'w') as f:
    f.write(html)

print("Fixed HTML written to welcome-email.html")
