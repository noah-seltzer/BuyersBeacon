using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TagsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TagsController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Gets all tags
        /// </summary>
        /// <returns>A list of all tags</returns>
        /// <response code="200">Returns the list of tags</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Tag>>> GetTags()
        {
            return await _context.Tags
                .Select(t => new Tag
                {
                    TagId = t.TagId,
                    Name = t.Name
                })
                .ToListAsync();
        }

        /// <summary>
        /// Gets a specific tag by its ID
        /// </summary>
        /// <param name="id">The GUID of the tag to retrieve</param>
        /// <returns>The requested tag</returns>
        /// <response code="200">Returns the requested tag</response>
        /// <response code="404">If the tag is not found</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Tag>> GetTag(Guid id)
        {
            var tag = await _context.Tags
                .Where(t => t.TagId == id)
                .Select(t => new Tag
                {
                    TagId = t.TagId,
                    Name = t.Name
                })
                .FirstOrDefaultAsync();

            if (tag == null)
            {
                return NotFound();
            }

            return tag;
        }

        /// <summary>
        /// Creates a new tag
        /// </summary>
        /// <param name="tagDto">The tag to create</param>
        /// <returns>The created tag</returns>
        /// <response code="201">Returns the newly created tag</response>
        /// <response code="400">If the tag data is invalid</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Tag>> CreateTag(Tag tagDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tag = new Tag
            {
                TagId = Guid.NewGuid(),
                Name = tagDto.Name
            };

            _context.Tags.Add(tag);
            await _context.SaveChangesAsync();

            tagDto.TagId = tag.TagId;

            return CreatedAtAction(nameof(GetTag), new { id = tag.TagId }, tagDto);
        }

        /// <summary>
        /// Updates an existing tag
        /// </summary>
        /// <param name="id">The GUID of the tag to update</param>
        /// <param name="tagDto">The updated tag data</param>
        /// <returns>No content if successful</returns>
        /// <response code="204">If the tag was successfully updated</response>
        /// <response code="400">If the tag data is invalid</response>
        /// <response code="404">If the tag is not found</response>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateTag(Guid id, Tag tagDto)
        {
            if (id != tagDto.TagId)
            {
                return BadRequest();
            }

            var tag = await _context.Tags.FindAsync(id);
            if (tag == null)
            {
                return NotFound();
            }

            tag.Name = tagDto.Name;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TagExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        /// <summary>
        /// Deletes a specific tag
        /// </summary>
        /// <param name="id">The GUID of the tag to delete</param>
        /// <returns>No content if successful</returns>
        /// <response code="204">If the tag was successfully deleted</response>
        /// <response code="404">If the tag is not found</response>
        /// <response code="400">If the tag has associated review tags</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteTag(Guid id)
        {
            var tag = await _context.Tags
                .Include(t => t.ReviewTags)
                .FirstOrDefaultAsync(t => t.TagId == id);

            if (tag == null)
            {
                return NotFound();
            }

            if (tag.ReviewTags.Any())
            {
                ModelState.AddModelError("", "Cannot delete tag with associated review tags");
                return BadRequest(ModelState);
            }

            _context.Tags.Remove(tag);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TagExists(Guid id)
        {
            return _context.Tags.Any(t => t.TagId == id);
        }
    }
}